import React from "react"
import Image from "next/image"
import { decode } from "html-entities"
import { z } from "zod"
import { CiLink } from "react-icons/ci"
import { ExternalUnderlineLink } from "@/components/underline-link"

import type { PostProps } from "../types"

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
    <ExternalUnderlineLink
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
      <span className="inherit-decoration absolute left-0 right-0 bottom-0 overflow-hidden text-ellipsis bg-black-900/80 p-1 text-center text-sm">
        {domain}
      </span>
    </ExternalUnderlineLink>
  )
}

export default LinkBlock
