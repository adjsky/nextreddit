import React from "react"
import { IoArrowUp } from "react-icons/io5"
import Skeleton from "react-loading-skeleton"

import UnderlineLink from "@/components/underline-link"
import getNumberLabel from "@/utils/get-number-label"

import type { PostProps } from "../types"

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
        <UnderlineLink href="#" className="opacity-50">
          {getNumberLabel(props.num_comments)} comments
        </UnderlineLink>
      )}
    </div>
  )
}

export default FooterRow
