import React from "react"
import Posts from "@/components/posts"

export const metadata = {
  title: "hot"
}

const Hot: React.FC = () => {
  return <Posts source="best" />
}

export default Hot
