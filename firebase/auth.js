"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./config"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        })
      } else {
        setUser(null)
        if (!loading) {
          router.push("/login")
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router, loading])

  return { user, loading }
}
