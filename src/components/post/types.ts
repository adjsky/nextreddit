import type { PostData } from "@/reddit-client"

export type PostProps =
  | {
      loading: true
    }
  | ({
      loading?: false
    } & PostData)
