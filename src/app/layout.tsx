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
        <div className="px-3">{children}</div>
      </body>
    </html>
  )
}

const Header: React.FC = () => {
  return (
    <header>
      <div className="fixed top-0 left-0 z-10 flex h-[3.125rem] w-full items-center bg-gray-500 px-3">
        <div className="flex gap-2 text-xl">
          <Link href="/">
            <span>next</span>
            <span className="text-aqua">reddit.</span>
          </Link>
          <span className="opacity-50">v{packageJson.version}</span>
        </div>
      </div>
      <div className="h-[3.125rem]" />
    </header>
  )
}

export default RootLayout
