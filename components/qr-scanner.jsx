"use client"

import { useEffect, useRef } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"

export default function QrScanner({ onScanSuccess, expectedCode }) {
  const scannerRef = useRef(null)

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        qrbox: { width: 250, height: 250 },
        fps: 10,
      },
      false,
    )

    scanner.render(
      (decodedText) => {
        if (decodedText === expectedCode) {
          scanner.clear()
          onScanSuccess(decodedText)
        } else {
          // Wrong QR code scanned
          alert("INVALID TRANSMISSION SOURCE. TRY AGAIN.")
        }
      },
      (error) => {
        // Scanner error - can be ignored for continuous scanning
        console.log(error)
      },
    )

    scannerRef.current = scanner

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error)
      }
    }
  }, [expectedCode, onScanSuccess])

  return (
    <div className="w-full static-overlay border border-[#dc2626]/30 bg-card/50 backdrop-blur-sm p-4">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#dc2626] signal-pulse" />
        <span className="text-xs font-mono tracking-widest text-[#dc2626] text-glow-subtle uppercase">
          Scanning for signal
        </span>
        <div className="w-2 h-2 rounded-full bg-[#dc2626] signal-pulse" />
      </div>
      <div
        id="qr-reader"
        className="[&_video]:rounded-none [&_button]:bg-[#dc2626]! [&_button]:border-[#dc2626]! [&_button]:text-white! [&_button]:font-mono! [&_button]:text-xs! [&_select]:bg-background! [&_select]:text-foreground! [&_select]:border-border! [&_select]:font-mono! [&_select]:text-xs!"
      />
    </div>
  )
}
