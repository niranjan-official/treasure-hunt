"use client"

import { useEffect, useState } from "react"
import { handleData, handleQuestionSubmit } from "../functions"
import { useAuth } from "@/firebase/auth"
import { useRouter } from "next/navigation"
import QrScanner from "@/components/qr-scanner"
import { StaticBackground } from "@/components/static-background"
import { SignalScanner } from "@/components/signal-scanner"

export default function Scan() {
  const router = useRouter()
  const [hint, setHint] = useState({})
  const [load, setLoad] = useState(true)
  const [trigger, setTrigger] = useState(false)
  const [check, setCheck] = useState(false)
  const [signalStrength, setSignalStrength] = useState(0)
  const { user: User, loading: authLoading } = useAuth()

  const fetchData = async () => {
    if (!User) return
    
    setLoad(true)
    try {
      const obj = await handleData(User.email)
      console.log(obj)

      if (!obj.StartTime) {
        setHint({
          hint: obj.hint.h,
          qr: obj.hint.qr,
          level: obj.level,
          userName: obj.userName,
        })
        setLoad(false)
      } else {
        router.push("/completion")
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoad(false)
    }
  }

  useEffect(() => {
    if (trigger) {
      updateLevel()
      setTrigger(false)
    }
  }, [trigger])

  const updateLevel = async () => {
    if (!User) return
    
    try {
      setCheck(true)
      await handleQuestionSubmit(User)
      setCheck(false)
      fetchData()
    } catch (error) {
      alert(error.message)
      setCheck(false)
    }
  }

  useEffect(() => {
    if (authLoading) return
    if (User) {
      fetchData()
    }
  }, [User, authLoading])

  useEffect(() => {
    // Simulate signal strength fluctuation
    const interval = setInterval(() => {
      setSignalStrength(Math.random() * 100)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Show loading while auth is being determined
  if (authLoading) {
    return (
      <div className="relative min-h-screen w-full bg-background overflow-hidden flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="inline-block w-16 h-16 border-4 border-[#dc2626]/30 border-t-[#dc2626] rounded-full animate-spin" />
          <p className="text-xs sm:text-sm font-mono tracking-widest text-muted-foreground">
            AUTHENTICATING...
          </p>
        </div>
      </div>
    )
  }

  if (!User) {
    return null
  }

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <StaticBackground />
      <SignalScanner />

      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-20 min-h-screen flex flex-col p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 animate-fade-in">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#dc2626] signal-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#dc2626] text-glow-subtle">
              ACTIVE HUNT
            </span>
          </div>
          <div className="text-[10px] sm:text-xs font-mono tracking-wider text-muted-foreground">
            <span className="hidden sm:inline">SIGNAL: </span>
            <span className="text-[#dc2626] signal-pulse">{Math.round(signalStrength)}%</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          {load ? (
            <div className="text-center space-y-6">
              <div className="inline-block w-16 h-16 border-4 border-[#dc2626]/30 border-t-[#dc2626] rounded-full animate-spin" />
              <p className="text-xs sm:text-sm font-mono tracking-widest text-muted-foreground">
                INITIALIZING SCANNER...
              </p>
            </div>
          ) : check ? (
            <div className="text-center space-y-6">
              <div className="inline-block w-16 h-16 border-4 border-[#dc2626]/30 border-t-[#dc2626] rounded-full animate-spin" />
              <p className="text-xs sm:text-sm font-mono tracking-widest text-muted-foreground">
                PROCESSING TRANSMISSION...
              </p>
            </div>
          ) : (
            <div className="w-full space-y-6 sm:space-y-8 fade-in-interference">
              <div className="text-center space-y-2 mb-4 animate-pulse-glow">
                <div className="text-5xl sm:text-7xl title-font text-[#dc2626] text-glow flicker">
                  SIGNAL {hint.level}
                </div>
                <div className="text-[10px] sm:text-xs font-mono tracking-widest text-muted-foreground uppercase">
                  Transmission Sequence
                </div>
              </div>

              <div className="w-full static-overlay border border-[#dc2626]/30 bg-card/50 backdrop-blur-sm p-6 sm:p-8 hover:border-glow-dim transition-all duration-300">
                <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="text-[#dc2626] text-xs font-mono shrink-0 flicker">◉</span>
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#dc2626] text-glow-subtle uppercase">
                    Intercepted Message
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base font-mono leading-relaxed text-foreground/90 tracking-wide">
                  &quot;{hint.hint}&quot;
                </p>
              </div>

              <div className="w-full max-w-md mx-auto static-overlay border border-[#dc2626]/30 bg-card/50 backdrop-blur-sm p-4">
                <QrScanner qr={hint.qr} setTrigger={setTrigger} />
              </div>
            </div>
          )}
        </div>

        {/* Footer stats */}
        {!load && (
          <div className="mt-6 sm:mt-8 space-y-2 font-mono text-[10px] sm:text-xs text-muted-foreground animate-fade-in-up">
            <div className="flex justify-between items-center">
              <span>OPERATIVE:</span>
              <span className="text-foreground">{hint.userName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>STATUS:</span>
              <span className="text-[#dc2626] signal-pulse">HUNTING</span>
            </div>
            <div className="flex justify-between items-center">
              <span>SIGNALS FOUND:</span>
              <span className="text-foreground">{hint.level - 1}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}