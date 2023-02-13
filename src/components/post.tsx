import React from "react"
import Link from "next/link"
import Image from "next/image"
import { decode } from "html-entities"
import { date } from "@/utils/dayjs"

import type { PostData } from "@/reddit-client"

const Post: React.FC<PostData> = ({
  score,
  subreddit,
  author,
  created,
  all_awardings
}) => {
  return (
    <div className="flex w-full items-baseline gap-2 rounded-md border border-gray-300 bg-black-500 px-3 py-4">
      <div className="min-w-[2.5rem] shrink-0">
        <span className="text-sm font-bold text-aqua">
          {getScoreLabel(score)}
        </span>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-1">
          <Link href="#" className="font-bold">
            r/{subreddit}
          </Link>
          <DotDelimeter />
          <Link href="#">r/{author}</Link>
          <DotDelimeter />
          <span className="opacity-50">{date(created)}</span>
          {all_awardings.map((awarding) => (
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
      </div>
    </div>
  )
}

const DotDelimeter: React.FC = () => {
  return <span className="text-xs opacity-50">•</span>
}

const getScoreLabel = (score: number) => {
  if (score < 1000) {
    return score
  }

  return (score / 1000).toFixed(1) + "k"
}

export default Post
