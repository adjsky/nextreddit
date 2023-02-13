import CommunityPage from "../community-page"
import type { NextPage } from "@/utils/types"

export const metadata = {
  title: "new"
}

const New: NextPage = ({ searchParams }) => {
  return <CommunityPage source="new" searchParams={searchParams} />
}

export default New
