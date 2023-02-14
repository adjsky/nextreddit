"use client"
import React, { useEffect } from "react"

const ScrollToTop: React.FC = () => {
  useEffect(() => {
    scrollTo({ left: 0, top: 0 })
  }, [])

  return null
}

export default ScrollToTop
