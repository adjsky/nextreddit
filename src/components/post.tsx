import "react-loading-skeleton/dist/skeleton.css"
import React from "react"
import clsx from "clsx"
import Link from "next/link"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"
import { decode } from "html-entities"
import { date } from "@/utils/dayjs"
import type { PostData } from "@/reddit-client"

type PostProps =
  | {
      loading: true
    }
  | ({
      loading?: false
    } & PostData)

const Post: React.FC<PostProps> = (props) => {
  return (
    <div className="flex w-full items-baseline gap-2 rounded-md border border-gray-300 bg-black-500 px-3 py-4">
      <span className="flex min-w-[2.5rem] shrink-0 text-sm font-bold text-aqua">
        {props.loading ? (
          <Skeleton containerClassName="w-full" />
        ) : (
          getScoreLabel(props.score)
        )}
      </span>
      <div className="w-full">
        <HeadingRow {...props} />
        <hr className="border-none py-2" />
        <TitleRow {...props} />
      </div>
    </div>
  )
}

const HeadingRow: React.FC<PostProps> = (props) => {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {props.loading ? (
        <Skeleton containerClassName="w-16" />
      ) : (
        <Link href="#" className="font-bold">
          r/{props.subreddit}
        </Link>
      )}
      <DotDelimeter />
      {props.loading ? (
        <Skeleton containerClassName="w-24" />
      ) : (
        <Link href="#">r/{props.author}</Link>
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

const TitleRow: React.FC<PostProps> = (props) => {
  const hasFlair =
    !props.loading &&
    (props.link_flair_richtext.length > 0 || props.link_flair_text != null)

  return (
    <h2>
      {!props.loading && hasFlair && (
        <a
          href="#"
          className={clsx(
            "mr-2 inline-flex items-center gap-1 rounded-md p-1 align-middle text-xs font-bold",
            !props.link_flair_background_color && "bg-aqua",
            !props.link_flair_text_color && "text-black-900"
          )}
          style={{
            background: !props.link_flair_background_color
              ? undefined
              : props.link_flair_background_color,
            color:
              props.link_flair_text_color == "light"
                ? "#fff"
                : props.link_flair_text_color == "dark"
                ? "#0f0f0f"
                : undefined
          }}
        >
          {props.link_flair_richtext.length > 0
            ? props.link_flair_richtext.map((text, index) =>
                text.e == "text" ? (
                  <span key={index}>{decode(text.t)}</span>
                ) : (
                  <span
                    key={index}
                    className="inline-block h-4 w-4 bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${text.u})` }}
                  />
                )
              )
            : decode(props.link_flair_text)}
        </a>
      )}
      {props.loading ? (
        <Skeleton count={2} />
      ) : (
        <a href="#" className="font-medium">
          {props.title}
        </a>
      )}
    </h2>
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
