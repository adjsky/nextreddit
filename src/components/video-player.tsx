"use client"

import "video.js/dist/video-js.css"
import React, { useRef, useEffect } from "react"
import videojs from "video.js"

type VideoPlayerProps = {
  poster?: string
  controls?: boolean
  autoplay?: boolean
  sources?: { src: string; type: string }[]
  preload?: "auto" | "metadata" | "none"
  fluid?: boolean
  width?: number
  height?: number
  responsive?: boolean
  aspectRatio?: string
  className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ className, ...options }) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)

  useEffect(() => {
    if (!videoRef.current) {
      return
    }

    if (!playerRef.current) {
      const videoElement = document.createElement("video-js")

      videoRef.current.appendChild(videoElement)

      playerRef.current = videojs(videoElement, options)
    } else {
      const player = playerRef.current

      player.autoplay(options.autoplay)
      player.src(options.sources)
    }
  }, [videoRef, options])

  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return <div data-vjs-player ref={videoRef} className={className} />
}

export default VideoPlayer
