"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/firebase/config"
import { doc, setDoc } from "firebase/firestore"
import { StaticBackground } from "@/components/static-background"
import { SignalScanner } from "@/components/signal-scanner"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [load, setLoad] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoad(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      await setDoc(doc(db, "users", email), {
        name: name,
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        path: [],
        startTime: new Date(),
        endTime: new Date(),
      })
      router.push("/instruction")
    } catch (e) {
      alert(e.message)
      setLoad(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <StaticBackground />
      <SignalScanner />

      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-20 min-h-screen flex flex-col items-center p-4 sm:p-6">
        <div className="w-full max-w-md flex justify-start items-center mb-8 sm:mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 min-h-[44px] font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground active:text-[#dc2626] transition-colors group"
          >
            <span className="text-[#dc2626] group-hover:text-glow-subtle transition-all duration-200">←</span>
            <span>RETURN</span>
          </Link>
        </div>

        <div className="max-w-md w-full space-y-6 md:space-y-8 fade-in-interference">
          <div className="text-center space-y-3 md:space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
              <div className="w-2 h-2 rounded-full bg-[#dc2626] signal-pulse" />
              <h2 className="text-[10px] md:text-xs font-mono tracking-widest text-[#dc2626] text-glow-subtle uppercase">
                Transmission Access Request
              </h2>
              <div className="w-2 h-2 rounded-full bg-[#dc2626] signal-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl title-font">
              REGISTER
            </h1>
            <p className="text-xs md:text-sm font-mono text-muted-foreground tracking-wide">
              Initialize system credentials
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <div className="static-overlay border border-[#dc2626]/30 p-6 md:p-8 bg-card/50 backdrop-blur-sm space-y-5 md:space-y-6 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="input-label"
                >
                  Team Callsign
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input"
                  placeholder="Your team designation"
                  autoComplete="name"
                  onFocus={(e) => e.target.previousSibling.classList.add('focused')}
                  onBlur={(e) => e.target.previousSibling.classList.remove('focused')}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="input-label"
                >
                  Transmission ID
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                  placeholder="signal@upside.down"
                  autoComplete="email"
                  onFocus={(e) => e.target.previousSibling.classList.add('focused')}
                  onBlur={(e) => e.target.previousSibling.classList.remove('focused')}
                />
              </div>

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
                  autoComplete="new-password"
                  onFocus={(e) => e.target.previousSibling.classList.add('focused')}
                  onBlur={(e) => e.target.previousSibling.classList.remove('focused')}
                />
              </div>

              <button
                type="submit"
                disabled={load}
                className="w-full px-6 py-5 md:py-4 bg-[#dc2626] text-white font-mono text-sm md:text-base tracking-widest uppercase border-2 border-[#dc2626] hover:bg-[#dc2626]/90 transition-all duration-300 border-glow disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] min-h-[56px] font-bold"
              >
                {load ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="flicker">ESTABLISHING LINK...</span>
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>REQUEST ACCESS</span>
                    <span className="signal-pulse inline-block">▸</span>
                  </span>
                )}
                {!load && (
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-block text-xs md:text-sm font-mono tracking-wide text-muted-foreground hover:text-[#dc2626] transition-all duration-300 hover:text-glow-subtle min-h-[44px] flex items-center justify-center"
              >
                <span className="text-[#dc2626] flicker">[</span>
                <span className="px-2">Already registered? Access transmission</span>
                <span className="text-[#dc2626] flicker">]</span>
              </Link>
            </div>
          </form>

          <div className="text-center pt-4 opacity-60">
            <p className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
              Signal encrypted • Transmission secure
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
