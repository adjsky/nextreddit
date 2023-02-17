import React from "react"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"

import UnderlineLink from "@/components/underline-link"
import DotDelimeter from "./dot-delimeter"
import { date } from "@/utils/dayjs"
import { decode } from "html-entities"

import type { PostProps } from "../types"

const HeadingRow: React.FC<PostProps> = (props) => {
  return (
    <div className="flex flex-wrap items-center gap-1 text-sm sm:text-base">
      {props.loading ? (
        <Skeleton containerClassName="w-16" />
      ) : (
        <UnderlineLink href="#" className="font-bold">
          r/{props.subreddit}
        </UnderlineLink>
      )}
      <DotDelimeter />
      {props.loading ? (
        <Skeleton containerClassName="w-24" />
      ) : (
        <UnderlineLink href="#">r/{props.author}</UnderlineLink>
      )}
      <DotDelimeter />
      {props.loading ? (
        <Skeleton containerClassName="w-12" />
      ) : (
        <span className="opacity-50">{date(props.created)}</span>
      )}
      {!props.loading &&
        props.all_awardings.map((awarding) => (
          <span key={awarding.id} title={awarding.name}>
            <Image
              alt={awarding.name}
              width={16}
              height={16}
              className="object-contain"
              src={decode(awarding.resized_icons[0].url)}
            />
          </span>
        ))}
    </div>
  )
}

export default HeadingRow
