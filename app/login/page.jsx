"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { StaticBackground } from "@/components/static-background"
import { SignalScanner } from "@/components/signal-scanner"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAttempts((prev) => prev + 1)

    // Simulated authentication - replace with your Firebase auth
    setTimeout(() => {
      setLoading(false)
      router.push("/instruction")
    }, 2000)
  }

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <StaticBackground />
      <SignalScanner />

      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-20 min-h-screen flex flex-col items-center p-4 sm:p-6">
        <div className="w-full max-w-md flex justify-between items-center mb-8 sm:mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 min-h-[44px] font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground active:text-[#dc2626] transition-colors group"
          >
            <span className="text-[#dc2626] group-hover:text-glow-subtle transition-all duration-200">←</span>
            <span>RETURN</span>
          </Link>

          <div className="font-mono text-[10px] sm:text-xs tracking-wider text-muted-foreground">
            <span className="hidden sm:inline">ACCESS ATTEMPTS: </span>
            <span className="sm:hidden">ATT: </span>
            <span className="text-[#dc2626] signal-pulse">{attempts.toString().padStart(3, "0")}</span>
          </div>
        </div>

        <div className="max-w-md w-full space-y-6 sm:space-y-8 fade-in-interference">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-[#dc2626] signal-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
              <h2 className="text-[10px] sm:text-xs font-mono tracking-widest text-[#dc2626] text-glow-subtle uppercase">
                Secure Terminal
              </h2>
              <div className="w-2 h-2 rounded-full bg-[#dc2626] signal-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl title-font">
              ACCESS
            </h1>
            <p className="text-xs sm:text-sm font-mono text-muted-foreground tracking-wide">
              Enter credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="static-overlay border border-[#dc2626]/30 p-6 sm:p-8 bg-card/50 backdrop-blur-sm space-y-5 sm:space-y-6 hover:border-glow-dim transition-all duration-300">
              {/* Email field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="input-label"
                >
                  User ID
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                  placeholder="user@system.net"
                  autoComplete="email"
                  onFocus={(e) => e.target.previousSibling.classList.add('focused')}
                  onBlur={(e) => e.target.previousSibling.classList.remove('focused')}
                />
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="input-label"
                >
                  Access Code
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  onFocus={(e) => e.target.previousSibling.classList.add('focused')}
                  onBlur={(e) => e.target.previousSibling.classList.remove('focused')}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[48px] sm:min-h-[52px] p-4 bg-[#dc2626] text-white font-mono text-sm tracking-widest uppercase border border-[#dc2626] hover:bg-[#dc2626]/90 active:scale-[0.98] transition-all duration-200 border-glow disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </span>
                ) : (
                  <span className="relative z-10">AUTHENTICATE</span>
                )}
                {!loading && (
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300" />
                )}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/signup"
                className="inline-block min-h-[44px] flex items-center justify-center text-xs font-mono tracking-wide text-muted-foreground hover:text-[#dc2626] active:text-[#dc2626] transition-colors"
              >
                <span className="text-[#dc2626]">[</span> Request new credentials{" "}
                <span className="text-[#dc2626]">]</span>
              </Link>
            </div>
          </form>

          {/* Security notice */}
          <div className="pt-2 sm:pt-4 text-center animate-fade-in">
            <p className="text-[10px] font-mono text-muted-foreground/60 tracking-wide leading-relaxed">
              All access is monitored and logged.
              <br />
              Unauthorized attempts will be traced.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
