import CommunityPage from "./community-page"
import type { NextPage } from "@/utils/types"

export const metadata = {
  title: "hot"
}
export const dynamic = "force-dynamic"

const Hot: NextPage = ({ searchParams }) => {
  return <CommunityPage source="hot" searchParams={searchParams} />
}

export default Hot
