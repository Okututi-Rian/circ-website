'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function UnauthorizedToast() {
  const params = useSearchParams()
  const [show, setShow] = useState(false)
  
  useEffect(() => {
    if (params.get("error") === "unauthorized") {
      setShow(true)
      setTimeout(() => setShow(false), 5000)
    }
  }, [params])
  
  if (!show) return null
  
  return (
    <div className="fixed top-20 right-4 z-50 bg-red-50 border border-red-200 text-red-700 font-body text-sm px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
      <span>Access denied. Admin role required.</span>
      <button onClick={() => setShow(false)} className="ml-2 text-red-400 hover:text-red-600">✕</button>
    </div>
  )
}
