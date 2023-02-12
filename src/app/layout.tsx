import "@/styles/globals.css"
import React from "react"
import Link from "next/link"
import { Inter } from "@next/font/google"

import packageJson from "../../package.json"

export const metadata = {
  title: {
    default: "nextreddit.",
    template: "%s | nextreddit."
  }
}

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"]
})

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="bg-black-900 text-white">
        <Header />
        {children}
      </body>
    </html>
  )
}

const Header: React.FC = () => {
  return (
    <header className="flex w-full bg-gray-500 px-3 py-3">
      <div className="flex gap-2 text-xl">
        <Link href="/">
          <span className="text-white">next</span>
          <span className="text-aqua">reddit.</span>
        </Link>
        <span className="text-white opacity-50">v{packageJson.version}</span>
      </div>
    </header>
  )
}

export default RootLayout
