import CommunityPage from "../community-page"
import type { NextPage } from "@/utils/types"

export const metadata = {
  title: "new"
}
export const dynamic = "force-dynamic"

const New: NextPage = ({ searchParams }) => {
  return <CommunityPage source="new" searchParams={searchParams} />
}

export default New
