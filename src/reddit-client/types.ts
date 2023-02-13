export type AccessTokenData = {
  access_token: string
}

export type LinkFlairRichText =
  | {
      e: "text"
      t: string
    }
  | { e: "emoji"; u: string }

export type PreviewImage = {
  source: {
    url: string
    width: number
    height: number
  }
}

export type Awarding = {
  id: string
  resized_icons: {
    url: string
    width: number
    height: number
  }[]
  name: string
}

export type PostData = {
  subreddit: string
  title: string
  score: number
  created: number
  id: string
  author: string
  num_comments: string
  link_flair_richtext: LinkFlairRichText[]
  link_flair_text_color: string
  link_flair_background_color: string
  all_awardings: Awarding[]
} & (
  | {
      post_hint?: "link" | "image"
      url: string
    }
  | {
      post_hint: "hosted:video"
      media: {
        reddit_video: {
          hls_url: string
        }
      }
      preview: {
        images: PreviewImage[]
      }
    }
  | {
      post_hint: "self"
      selftext: string
    }
)
