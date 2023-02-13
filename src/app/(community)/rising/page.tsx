import CommunityPage from "../community-page"
import type { NextPage } from "@/utils/types"

export const metadata = {
  title: "rising"
}
export const dynamic = "force-dynamic"

const Rising: NextPage = ({ searchParams }) => {
  return <CommunityPage source="rising" searchParams={searchParams} />
}

export default Rising
