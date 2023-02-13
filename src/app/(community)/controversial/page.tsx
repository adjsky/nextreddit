import CommunityPage from "../community-page"
import type { NextPage } from "@/utils/types"

export const metadata = {
  title: "controversial"
}
export const dynamic = "force-dynamic"

const Controversial: NextPage = ({ searchParams }) => {
  return <CommunityPage source="controversial" searchParams={searchParams} />
}

export default Controversial
