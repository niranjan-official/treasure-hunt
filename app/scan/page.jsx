"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { StaticBackground } from "@/components/static-background"
import { SignalScanner } from "@/components/signal-scanner"
import dynamic from "next/dynamic"

// Dynamically import QR scanner to avoid SSR issues
const QrScanner = dynamic(() => import("@/components/qr-scanner"), { ssr: false })

export default function Scan() {
  const [hint, setHint] = useState({
    hint: "SIGNAL DETECTED AT COORDINATES: NORTH WING, SECTOR 7. LOOK FOR THE MARKED POINT.",
    qr: "SAMPLE_QR_CODE",
    level: 1,
    userName: "AGENT_X",
  })
  const [loading, setLoading] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [signalStrength, setSignalStrength] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Simulate signal strength fluctuation
    const interval = setInterval(() => {
      setSignalStrength(Math.random() * 100)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleScanSuccess = (result) => {
    if (result === hint.qr) {
      setScanning(false)
      setLoading(true)

      // Simulated level progression - replace with your Firebase logic
      setTimeout(() => {
        // Check if completed or move to next level
        setLoading(false)
        setHint({
          hint: "NEW TRANSMISSION DETECTED. PROCEED TO EAST CORRIDOR, JUNCTION 12.",
          qr: "NEXT_QR_CODE",
          level: 2,
          userName: "AGENT_X",
        })
      }, 2000)
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <StaticBackground />
      <SignalScanner />

      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-20 min-h-screen flex flex-col p-4 sm:p-6">
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
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full space-y-6 sm:space-y-8 fade-in-interference">
          {loading ? (
            <div className="text-center space-y-6">
              <div className="inline-block w-16 h-16 border-4 border-[#dc2626]/30 border-t-[#dc2626] rounded-full animate-spin" />
              <p className="text-xs sm:text-sm font-mono tracking-widest text-muted-foreground">
                PROCESSING TRANSMISSION...
              </p>
            </div>
          ) : (
            <>
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
                  "{hint.hint}"
                </p>
              </div>

              {scanning ? (
                <div className="w-full max-w-md">
                  <QrScanner onScanSuccess={handleScanSuccess} expectedCode={hint.qr} />
                </div>
              ) : (
                <button
                  onClick={() => setScanning(true)}
                  className="w-full max-w-md min-h-[48px] sm:min-h-[52px] p-4 bg-[#dc2626] text-white font-mono text-sm sm:text-base tracking-widest uppercase border border-[#dc2626] hover:bg-[#dc2626]/90 active:scale-[0.98] transition-all duration-200 border-glow relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>ACTIVATE SCANNER</span>
                    <span className="text-xl">📡</span>
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300" />
                </button>
              )}

              {scanning && (
                <button
                  onClick={() => setScanning(false)}
                  className="min-h-[44px] text-xs font-mono tracking-wide text-muted-foreground hover:text-[#dc2626] active:text-[#dc2626] transition-colors"
                >
                  <span className="text-[#dc2626]">[</span> CLOSE SCANNER <span className="text-[#dc2626]">]</span>
                </button>
              )}
            </>
          )}
        </div>

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
            <span className="text-foreground">{hint.level - 1}/10</span>
          </div>
        </div>
      </div>
    </div>
  )
}
