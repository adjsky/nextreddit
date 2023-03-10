import CommunityPage from "../community-page"
import type { NextPage } from "@/utils/types"

export const metadata = {
  title: "top"
}
export const dynamic = "force-dynamic"

const Top: NextPage = ({ searchParams }) => {
  return <CommunityPage source="top" searchParams={searchParams} />
}

export default Top
