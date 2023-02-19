import React from "react"
import parseHtmlToReact from "html-react-parser"
import Skeleton from "react-loading-skeleton"
import Image from "next/image"
import { decode } from "html-entities"
import clsx from "clsx"

import VideoPlayer from "../../video-player"
import MediaViewer from "@/components/media-viewer"

import type { PostProps } from "../types"

const PostBody: React.FC<PostProps> = (props) => {
  if (props.loading) {
    return <Skeleton count={5} />
  }

  if (props.post_hint == "image") {
    const image = props.preview.images[0].source
    const long = image.height / image.width > 3

    return (
      <MediaViewer className="flex justify-center">
        <Image
          src={decode(image.url)}
          width={image.width}
          height={image.height}
          alt="Preview"
          className={clsx(
            !long && "max-h-[512px] w-full object-contain",
            long && "max-w-full text-center"
          )}
        />
      </MediaViewer>
    )
  }

  if ((!props.post_hint || props.post_hint == "self") && props.selftext_html) {
    return (
      <div className={clsx("selftext", props.stickied && "stickied")}>
        {parseHtmlToReact(decode(props.selftext_html))}
      </div>
    )
  }

  if (props.post_hint == "hosted:video") {
    const video = props.media.reddit_video
    const horizontal = video.width >= video.height

    const containerWidth = horizontal ? "100%" : "auto"
    const aspectRatio = video.width / video.height

    return (
      <div className="@container">
        <div
          className={clsx(
            "mx-auto",
            horizontal && "h-auto",
            !horizontal && "vjs-vertical-container"
          )}
          style={
            {
              "--ratio": aspectRatio,
              "--height": !horizontal
                ? video.height >= 512
                  ? "512px"
                  : `${video.height}px`
                : undefined,
              aspectRatio: "var(--ratio)",
              width: containerWidth
            } as React.CSSProperties
          }
        >
          <VideoPlayer
            sources={[
              {
                src: decode(video.hls_url),
                type: "application/x-mpegURL"
              }
            ]}
            poster={decode(props.preview.images[0].source.url)}
            preload="none"
            autoplay={false}
            className="h-full"
            controls
            fluid
          />
        </div>
      </div>
    )
  }

  return null
}

export default PostBody
