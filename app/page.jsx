"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { StaticBackground } from "@/components/static-background"
import { SignalScanner } from "@/components/signal-scanner"

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [flicker, setFlicker] = useState(false)

  useEffect(() => {
    setLoaded(true)

    // Random flicker effect
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlicker(true)
        setTimeout(() => setFlicker(false), 100)
      }
    }, 3000)

    return () => clearInterval(flickerInterval)
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <StaticBackground />
      <SignalScanner />

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />

      <div
        className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"} ${flicker ? "opacity-60" : ""}`}
      >
        {/* Main content */}
        <div className="max-w-2xl w-full space-y-6 sm:space-y-8 fade-in-interference">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
            <div className="relative w-full flex justify-center">
              <div className="relative w-64 h-32 sm:w-80 sm:h-40 md:w-96 md:h-48">
                <Image
                  src="/images/logo.png"
                  alt="Signal Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-mono tracking-wider text-foreground/70 uppercase animate-fade-in-up">
              Trace the Hidden Path
            </h2>
          </div>

          <div className="static-overlay border border-[#dc2626]/30 p-6 sm:p-8 bg-card/50 backdrop-blur-sm border-glow-dim hover:border-glow transition-all duration-300">
            <p className="text-sm sm:text-base font-mono leading-relaxed sm:leading-relaxed text-foreground/80 tracking-wide">
              <span className="text-[#dc2626]">[CLASSIFIED]</span> Something is transmitting from multiple locations.
              Each signal contains fragments of a larger message. Your device has been configured to detect these
              transmissions. Follow the coordinates. Scan the sources. Piece together what's hidden.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/login" className="block">
              <button className="w-full min-h-[48px] sm:min-h-[56px] p-4 bg-[#dc2626] text-white font-mono text-base sm:text-lg tracking-widest uppercase border border-[#dc2626] hover:bg-[#dc2626]/90 active:scale-[0.98] transition-all duration-200 border-glow relative overflow-hidden group">
                <span className="relative z-10">ACCESS SYSTEM</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300" />
              </button>
            </Link>

            <div className="flex items-center gap-4 px-4 py-2">
              <div className="flex-1 h-px bg-border animate-expand-horizontal" />
              <span className="text-xs font-mono text-muted-foreground tracking-widest">OR</span>
              <div className="flex-1 h-px bg-border animate-expand-horizontal" />
            </div>

            <Link href="/signup" className="block">
              <button className="w-full min-h-[48px] sm:min-h-[56px] p-4 bg-transparent text-foreground font-mono text-base sm:text-lg tracking-widest uppercase border border-foreground/30 hover:border-foreground/60 hover:bg-foreground/5 active:scale-[0.98] transition-all duration-200 relative overflow-hidden group">
                <span className="relative z-10">NEW REGISTRATION</span>
                <div className="absolute inset-0 bg-foreground/5 translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300" />
              </button>
            </Link>
          </div>

          <div className="pt-6 sm:pt-8 space-y-2 font-mono text-[10px] sm:text-xs text-muted-foreground tracking-wider animate-fade-in-up">
            <div className="flex justify-between items-center">
              <span>SYSTEM STATUS:</span>
              <span className="text-[#dc2626] signal-pulse">OPERATIONAL</span>
            </div>
            <div className="flex justify-between items-center">
              <span>ENCRYPTION:</span>
              <span>AES-256</span>
            </div>
            <div className="flex justify-between items-center">
              <span>LOCATION:</span>
              <span className="flicker">████████</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
