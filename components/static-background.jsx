"use client"

import { useEffect, useRef } from "react"

export function StaticBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    let animationFrame

    const drawStatic = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value // Red
        data[i + 1] = value // Green
        data[i + 2] = value // Blue
        data[i + 3] = 3 // Alpha (very transparent)
      }

      ctx.putImageData(imageData, 0, 0)
      animationFrame = requestAnimationFrame(drawStatic)
    }

    drawStatic()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-9997 opacity-[0.015]" aria-hidden="true" />
  )
}
