import Posts from "@/components/posts"
import type { Community } from "@/data"
import type { NextPageProps } from "@/utils/types"

const CommunityPage = ({
  searchParams,
  source
}: NextPageProps & {
  source: Community
}) => {
  const after = searchParams?.after
  const before = searchParams?.before

  return (
    <Posts
      source={source}
      after={Array.isArray(after) ? undefined : after}
      before={Array.isArray(before) ? undefined : before}
    />
  )
}

export default CommunityPage
