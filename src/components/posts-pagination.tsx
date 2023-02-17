"use client"

import React from "react"
import { usePathname } from "next/navigation"
import UnderlineLink from "./underline-link"

const PostsPagination: React.FC<{ next?: string; prev?: string }> = ({
  next,
  prev
}) => {
  const pathname = usePathname()

  return (
    <div className="flex w-full justify-center">
      <UnderlineLink
        href={`${pathname}?after=${next}`}
        className="rounded-md bg-gray-500 py-2 px-5"
      >
        NEXT
      </UnderlineLink>
    </div>
  )
}

export default PostsPagination
