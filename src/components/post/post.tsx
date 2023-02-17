import "react-loading-skeleton/dist/skeleton.css"
import "@/styles/selftext.css"
import React from "react"
import clsx from "clsx"
import Skeleton from "react-loading-skeleton"

import getNumberLabel from "@/utils/get-number-label"

import HeadingRow from "./pieces/heading-row"
import TitleRow from "./pieces/title-row"
import PostBody from "./pieces/post-body"
import FooterRow from "./pieces/footer-row"
import LinkBlock from "./pieces/link-block"

import type { PostProps } from "./types"

const Post: React.FC<PostProps> = (props) => {
  const stickied = !props.loading && props.stickied

  return (
    <div
      className={clsx(
        "flex w-full items-baseline gap-2 rounded-md border px-3 py-4",
        "border-gray-300 bg-black-500 transition-colors hover:bg-gray-600",
        stickied && "border border-green"
      )}
    >
      <span
        className={clsx(
          "hidden min-w-[2.5rem] shrink-0 text-sm font-bold sm:flex",
          stickied ? "text-green" : "text-aqua"
        )}
      >
        {props.loading ? (
          <Skeleton containerClassName="w-full" />
        ) : (
          getNumberLabel(props.score)
        )}
      </span>
      <div className="flex w-full flex-col gap-3">
        <HeadingRow {...props} />
        <TitleRow {...props} />
        <PostBody {...props} />
        <FooterRow {...props} />
      </div>
      <LinkBlock {...props} />
    </div>
  )
}

export default Post
