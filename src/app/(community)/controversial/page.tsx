import CommunityPage from "../community-page"
import type { NextPage } from "@/utils/types"

export const metadata = {
  title: "controversial"
}

const Controversial: NextPage = ({ searchParams }) => {
  return <CommunityPage source="controversial" searchParams={searchParams} />
}

export default Controversial
