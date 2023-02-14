import React from "react"
import Post from "@/components/post"

const Loading: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      {Array.from({ length: 25 }).map((_, index) => (
        <Post loading key={index} />
      ))}
    </div>
  )
}

export default Loading
