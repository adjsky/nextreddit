import "@/styles/globals.css"
import React from "react"

export const metadata = {
  title: "abobus"
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
