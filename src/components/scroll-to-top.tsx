"use client"

import React, { useEffect } from "react"

const ScrollToTop: React.FC = () => {
  useEffect(() => {
    scrollTo({ left: 0, behavior: "smooth", top: 0 })
  }, [])

  return null
}

export default ScrollToTop
