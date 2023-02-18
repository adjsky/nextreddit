"use client"

import React, { cloneElement, useMemo } from "react"
import useToggle from "@/utils/use-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { IoCloseOutline } from "react-icons/io5"

import type { ImageProps } from "next/image"
import type { ReactElement } from "react"

const MediaViewer: React.FC<{ children: ReactElement<ImageProps> }> = ({
  children
}) => {
  const [toggled, toggle] = useToggle()

  const bigImage = useMemo(
    () =>
      cloneElement(children, {
        className: "max-w-[1000px] w-full h-auto max-h-[85%] object-contain"
      }),
    [children]
  )

  return (
    <>
      <button onClick={toggle}>{children}</button>
      <AnimatePresence>
        {toggled && (
          <motion.div
            animate={{
              opacity: 1,
              transition: { ease: "easeOut", duration: 0.15 }
            }}
            initial={{ opacity: 0 }}
            exit={{
              opacity: 0,
              transition: { ease: "easeIn", duration: 0.15 }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,.88)]"
            onClick={toggle}
          >
            <button className="group absolute right-3 top-3 rounded-full p-1.5 transition-colors hover:bg-gray-600/40">
              <IoCloseOutline
                size="1.75rem"
                className="stroke-gray-100 transition-colors group-hover:stroke-white"
              />
            </button>
            {bigImage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MediaViewer
