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
import { z } from "zod"
import { CiLink } from "react-icons/ci"
import { IoArrowUp } from "react-icons/io5"
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
      <div className="flex w-full flex-col gap-4">
        <HeadingRow {...props} />
        <TitleRow {...props} />
        <PostBody {...props} />
        <FooterRow {...props} />
      </div>
      <LinkBlock {...props} />
    </div>
  )
}

const HeadingRow: React.FC<PostProps> = (props) => {
  return (
    <div className="flex flex-wrap items-center gap-1 text-sm sm:text-base">
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
        <Link
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
        </Link>
      )}
      {props.loading ? (
        <Skeleton count={2} />
      ) : (
        <Link href="#" className="font-medium">
          {props.title}
        </Link>
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
      <Link href="#">
        <Image
          src={decode(image.url)}
          width={image.width}
          height={image.height}
          alt="Preview"
          className="max-h-[512px] w-full object-contain"
        />
      </Link>
    )
  }

  if (!props.post_hint && props.selftext) {
    return (
      <div className={clsx("selftext", props.stickied && "stickied")}>
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
    <div className="flex items-center gap-3 text-sm font-bold">
      <div className="flex items-center sm:hidden">
        {props.loading ? (
          <Skeleton containerClassName="w-10" />
        ) : (
          <>
            <IoArrowUp className="stroke-aqua" />
            <span className="text-aqua">{getNumberLabel(props.score)}</span>
          </>
        )}
      </div>
      {props.loading ? (
        <Skeleton containerClassName="w-32" />
      ) : (
        <Link href="#" className="opacity-50">
          {getNumberLabel(props.num_comments)} comments
        </Link>
      )}
    </div>
  )
}

const LinkBlock: React.FC<PostProps> = (props) => {
  if (props.loading || (props.post_hint != "link" && !props.is_gallery)) {
    return null
  }

  let imageUrl = decode(props.thumbnail)
  let imageWidth = props.thumbnail_width
  let imageHeight = props.thumbnail_height
  const domain = props.post_hint == "link" ? props.domain : "gallery"

  if (props.post_hint == "link") {
    const images = props.preview.images[0]

    if (images.resolutions.length > 0) {
      const image =
        images.resolutions.length > 2
          ? images.resolutions[2]
          : images.resolutions[images.resolutions.length - 1]
      imageUrl = decode(image.url)
      imageWidth = image.width
      imageHeight = image.height
    }
  }

  return (
    <a
      href={props.url}
      target="_blank"
      rel="noreferrer"
      className="relative flex max-w-[8.75rem] flex-col self-stretch overflow-hidden rounded-md border border-gray-300 bg-black-900 sm:shrink-0"
    >
      <span className="flex flex-1 items-center justify-center">
        {z.string().url().safeParse(imageUrl).success &&
        imageWidth != null &&
        imageHeight != null ? (
          <Image
            src={imageUrl}
            width={imageWidth}
            height={imageHeight}
            alt=""
            className="object-contain"
          />
        ) : (
          <CiLink size="2.5rem" />
        )}
      </span>
      <span className="absolute left-0 right-0 bottom-0 overflow-hidden text-ellipsis bg-black-900/80 p-1 text-center text-sm">
        {domain}
      </span>
    </a>
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
