export type AccessTokenData = {
  access_token: string
}

export type LinkFlairRichText =
  | {
      e: "text"
      t: string
    }
  | { e: "emoji"; u: string }

export type RedditImage = {
  url: string
  width: number
  height: number
}

export type PreviewImage = {
  source: RedditImage
  resolutions: RedditImage[]
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
  name: string
  num_comments: number
  link_flair_text: string | null
  link_flair_richtext: LinkFlairRichText[]
  link_flair_text_color: string | null
  link_flair_background_color: string | null
  all_awardings: Awarding[]
  stickied: boolean
  is_gallery?: boolean
  thumbnail: string
  thumbnail_width: number | null
  thumbnail_height: number | null
  url: string
} & (
  | {
      post_hint: "link"
      preview: {
        images: PreviewImage[]
      }
      domain: string
    }
  | {
      post_hint: "image"
      preview: {
        images: PreviewImage[]
      }
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
      post_hint: undefined
      selftext: string
    }
)
