import "react-loading-skeleton/dist/skeleton.css"
import "@/styles/selftext.css"
import React from "react"
import clsx from "clsx"
import Link from "next/link"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"
import { decode } from "html-entities"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
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
  const noBody =
    !props.loading &&
    (props.post_hint == "link" || (!props.post_hint && !props.selftext))
  const stickied = !props.loading && props.stickied

  return (
    <div
      className={clsx(
        "flex w-full items-baseline gap-2 rounded-md border border-gray-300 bg-black-500 px-3 py-4",
        stickied && "border border-green"
      )}
    >
      <span
        className={clsx(
          "flex min-w-[2.5rem] shrink-0 text-sm font-bold",
          stickied ? "text-green" : "text-aqua"
        )}
      >
        {props.loading ? (
          <Skeleton containerClassName="w-full" />
        ) : (
          getNumberLabel(props.score)
        )}
      </span>
      <div className="w-full">
        <HeadingRow {...props} />
        <hr className="border-none py-2" />
        <TitleRow {...props} />
        {!noBody && (
          <>
            <hr className="border-none py-2" />
            <PostBody {...props} />
          </>
        )}
        <hr className="border-none py-2" />
        <FooterRow {...props} />
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

const PostBody: React.FC<PostProps> = (props) => {
  if (props.loading) {
    return <Skeleton count={5} />
  }

  if (props.post_hint == "image") {
    const image = props.preview.images[0].source

    return (
      <a href="#">
        <Image
          src={decode(image.url)}
          width={image.width}
          height={image.height}
          alt="Preview"
          className="max-h-[512px] w-full object-contain"
        />
      </a>
    )
  }

  if (!props.post_hint && props.selftext) {
    return (
      <div className="selftext">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {props.selftext}
        </ReactMarkdown>
      </div>
    )
  }

  if (props.post_hint == "hosted:video") {
    return <span>VIDEO!!!</span>
  }

  return null
}

const FooterRow: React.FC<PostProps> = (props) => {
  return (
    <div className="flex justify-between text-sm">
      {props.loading ? (
        <Skeleton containerClassName="w-full" />
      ) : (
        <a href="#" className="font-bold opacity-50">
          <span>{getNumberLabel(props.num_comments)} comments</span>
        </a>
      )}
    </div>
  )
}

const DotDelimeter: React.FC = () => {
  return <span className="text-xs opacity-50">•</span>
}

const getNumberLabel = (score: number) => {
  if (score < 1000) {
    return score
  }

  return (score / 1000).toFixed(1) + "k"
}

export default Post
