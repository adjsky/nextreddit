import React from "react"
import redditClient from "@/reddit-client"

type PostsProps = {
  source: "best" | "top" | "new" | "rising" | "controversial"
}

const AsyncPosts = async ({ source }: PostsProps) => {
  const posts: any = await redditClient.request(`/${source}`, {
    next: { revalidate: 30 }
  })

  return <span>{posts.data.children[0].data.title}</span>
}

const Posts: React.FC<PostsProps> = (props) => {
  /* @ts-expect-error Server Component */
  return <AsyncPosts {...props} />
}

export default Posts
