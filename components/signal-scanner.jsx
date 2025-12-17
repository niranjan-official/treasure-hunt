"use client"

import { useEffect, useState } from "react"

export function SignalScanner() {
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setScanning((prev) => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 pointer-events-none z-9996">
      <div
        className={`h-full bg-linear-to-r from-transparent via-[#dc2626] to-transparent transition-transform duration-3000 ease-linear ${
          scanning ? "translate-y-[100vh]" : "translate-y-0"
        }`}
        style={{
          boxShadow: "0 0 20px #dc2626, 0 0 40px #dc2626",
          opacity: 0.3,
        }}
      />
    </div>
  )
}
