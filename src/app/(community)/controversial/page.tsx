import React from "react"
import Posts from "@/components/posts"

export const metadata = {
  title: "controversial"
}

const Controversial: React.FC = () => {
  return <Posts source="controversial" />
}

export default Controversial
