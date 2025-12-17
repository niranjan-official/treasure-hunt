"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StaticBackground } from "@/components/static-background"
import { SignalScanner } from "@/components/signal-scanner"
import Image from "next/image"

export default function Instruction() {
  const [loading, setLoading] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const router = useRouter()

  const handleStart = async () => {
    setLoading(true)

    // Simulated path generation - replace with your Firebase logic
    setTimeout(() => {
      router.push("/scan")
    }, 2000)
  }

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <StaticBackground />
      <SignalScanner />

      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-20 min-h-screen flex items-center justify-center p-4 sm:p-6 py-8 sm:py-12">
        <div className="max-w-2xl w-full space-y-3  fade-in-interference">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 animate-fade-in">
              <div className="text-xl sm:text-2xl text-[#dc2626] flicker">⚠</div>
              <h2 className="text-[10px] sm:text-xs font-mono tracking-widest text-[#dc2626] text-glow-subtle uppercase">
                Mission Brief
              </h2>
              <div className="text-xl sm:text-2xl text-[#dc2626] flicker">⚠</div>
            </div>
            <div className="relative w-full flex justify-center">
              <div className="relative w-64 h-32 sm:w-80 sm:h-40 md:w-96 md:h-48">
                <Image
                  src="/images/logo-3.png"
                  alt="Protocol Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="static-overlay border border-[#dc2626]/30 bg-card/50 backdrop-blur-sm hover:border-glow-dim transition-all duration-300">
            {/* Image placeholder */}
            <div className="w-full h-48 sm:h-64 bg-background/80 border-b border-[#dc2626]/30 flex items-center justify-center relative overflow-hidden">
              <div className="relative z-10 text-center w-full h-full flex flex-col items-center justify-center p-4">
                <div className="relative w-full h-full max-w-[300px] max-h-[200px]">
                  <Image
                    src="/images/wave.png"
                    alt="Signal Wave"
                    fill
                    className="object-contain flicker w-full h-full"
                    priority
                  />
                </div>
                <div className="text-[10px] sm:text-xs font-mono tracking-widest text-[#dc2626] text-glow-subtle">
                  SIGNAL DETECTION ACTIVE
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 sm:space-y-5">
              <div className="space-y-4 sm:space-y-3 text-xs sm:text-sm font-mono leading-relaxed text-foreground/80">
                <div className="flex gap-2 sm:gap-3">
                  <span className="text-[#dc2626] shrink-0 font-bold">[01]</span>
                  <p>Scan QR codes hidden across campus to collect signal fragments.</p>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <span className="text-[#dc2626] shrink-0 font-bold">[02]</span>
                  <p>Follow your team's unique path. Do not deviate from assigned coordinates.</p>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <span className="text-[#dc2626] shrink-0 font-bold">[03]</span>
                  <p>Timer starts now. Fastest team to complete the sequence wins.</p>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <span className="text-[#dc2626] shrink-0 font-bold">[04]</span>
                  <p>Each transmission reveals clues to your next location.</p>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <span className="text-[#dc2626] shrink-0 font-bold">[05]</span>
                  <p>Maintain operational security. No sharing coordinates with other teams.</p>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <span className="text-[#dc2626] shrink-0 font-bold">[06]</span>
                  <p>Do not tamper with or remove QR codes from their positions.</p>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <span className="text-[#dc2626] shrink-0 font-bold">[07]</span>
                  <p>If a code won't scan, stay calm. Move to better lighting and try again.</p>
                </div>
              </div>

              <div className="pt-4 sm:pt-5 border-t border-border/30">
                <label className="flex items-start gap-3 cursor-pointer group min-h-[44px]">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-0.5 w-5 h-5 sm:w-4 sm:h-4 bg-background border-2 border-border appearance-none checked:bg-[#dc2626] checked:border-[#dc2626] focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50 transition-all duration-200 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                    I acknowledge these protocols and accept responsibility for this mission
                  </span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={!accepted || loading}
            className="w-full min-h-[48px] sm:min-h-[52px] p-4 bg-[#dc2626] text-white font-mono text-sm sm:text-base tracking-widest uppercase border border-[#dc2626] hover:bg-[#dc2626]/90 active:scale-[0.98] transition-all duration-200 border-glow disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="hidden sm:inline">INITIALIZING SCANNER...</span>
                <span className="sm:hidden">INITIALIZING...</span>
              </span>
            ) : (
              <span className="relative z-10">
                <span className="hidden sm:inline">BEGIN TRANSMISSION HUNT</span>
                <span className="sm:hidden">BEGIN HUNT</span>
              </span>
            )}
            {!loading && accepted && (
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300" />
            )}
          </button>

          {/* Warning */}
          <div className="text-center pt-2 sm:pt-4 animate-fade-in">
            <p className="text-[10px] font-mono text-muted-foreground/60 tracking-wide">
              <span className="text-[#dc2626] flicker">⚠</span> ONCE STARTED, THE TIMER CANNOT BE STOPPED{" "}
              <span className="text-[#dc2626] flicker">⚠</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}