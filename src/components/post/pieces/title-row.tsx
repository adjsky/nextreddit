import React from "react"
import clsx from "clsx"
import { decode } from "html-entities"
import Skeleton from "react-loading-skeleton"

import UnderlineLink from "@/components/underline-link"

import type { PostProps } from "../types"

const TitleRow: React.FC<PostProps> = (props) => {
  const hasFlair =
    !props.loading &&
    (props.link_flair_richtext.length > 0 || props.link_flair_text != null)

  return (
    <h2>
      {!props.loading && hasFlair && (
        <UnderlineLink
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
        </UnderlineLink>
      )}
      {props.loading ? (
        <Skeleton count={2} />
      ) : (
        <UnderlineLink href="#" className="font-medium">
          {decode(props.title)}
        </UnderlineLink>
      )}
    </h2>
  )
}

export default TitleRow
