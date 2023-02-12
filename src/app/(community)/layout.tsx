import React from "react"
import CommunityNavigation from "@/components/community-navigation"

const CommunityLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="mx-auto my-5 flex w-full max-w-[750px] flex-col items-start gap-5">
      <CommunityNavigation />
      {children}
    </main>
  )
}

export default CommunityLayout
