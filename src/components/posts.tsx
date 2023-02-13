import React from "react"
import redditClient from "@/reddit-client"
import Post from "./post"
import PostsPagination from "./posts-pagination"

import type { PostData } from "@/reddit-client"
import type { Community } from "@/data"

type PostsProps = {
  source: Community
  after?: string
  before?: string
}

const getPosts = async (source: Community, after?: string, before?: string) => {
  const response = await redditClient.request<{
    data: { children: { data: PostData }[] }
  }>(`/${source}`, {
    next: { revalidate: after || before ? false : 30 },
    query: {
      after,
      before,
      count: 25
    }
  })

  return response.data.children
}

const AsyncPosts = async ({ source, after, before }: PostsProps) => {
  const posts = await getPosts(source, after, before)

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        {posts.map((post) => (
          <Post key={post.data.id} {...post.data} />
        ))}
      </div>
      <PostsPagination next={posts[posts.length - 1].data.name} />
    </>
  )
}

const Posts: React.FC<PostsProps> = (props) => {
  /* @ts-expect-error Server Component */
  return <AsyncPosts {...props} />
}

export default Posts
