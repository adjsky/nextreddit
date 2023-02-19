import "@/styles/globals.css"
import React from "react"
import { SkeletonTheme } from "react-loading-skeleton"
import { Inter } from "next/font/google"
import packageJson from "../../package.json"
import ScrollToTop from "@/components/scroll-to-top"
import UnderlineLink from "@/components/underline-link"

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
        <SkeletonTheme baseColor="#333" highlightColor="#444">
          {children}
        </SkeletonTheme>
        <ScrollToTop />
      </body>
    </html>
  )
}

const Header: React.FC = () => {
  return (
    <header>
      <div className="fixed top-0 left-0 z-10 flex h-[3.125rem] w-full items-center bg-gray-500 px-3">
        <div className="flex gap-2 text-xl">
          <UnderlineLink href="/">
            <span>next</span>
            <span className="text-aqua">reddit.</span>
          </UnderlineLink>
          <span className="opacity-50">v{packageJson.version}</span>
        </div>
      </div>
      <div className="h-[3.125rem]" />
    </header>
  )
}

export default RootLayout
