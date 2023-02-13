import CommunityPage from "../community-page"
import type { NextPage } from "@/utils/types"

export const metadata = {
  title: "rising"
}

const Rising: NextPage = ({ searchParams }) => {
  return <CommunityPage source="rising" searchParams={searchParams} />
}

export default Rising
