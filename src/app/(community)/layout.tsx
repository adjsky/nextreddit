import React from "react"
import CommunityNavigation from "@/components/community-navigation"

const CommunityLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="py-5 px-3">
      <div className="mx-auto flex w-full max-w-[750px] flex-col items-start gap-5">
        <CommunityNavigation />
        {children}
      </div>
    </main>
  )
}

export default CommunityLayout
