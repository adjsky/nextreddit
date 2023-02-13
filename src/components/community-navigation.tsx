"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import capitalize from "@/utils/capitalize"
import { communities } from "@/data"

const navigation = communities.map((community) => ({
  title: capitalize(community),
  href: community == "hot" ? "/" : `/${community}`
}))

const CommunityNavigation: React.FC = () => {
  const pathname = usePathname()

  return (
    <nav className="flex max-w-full overflow-x-auto rounded-md">
      <ul className="flex">
        {navigation.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={clsx(
                "flex py-2 px-5",
                item.href == pathname && "bg-aqua text-gray-600",
                item.href != pathname && "bg-gray-600"
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CommunityNavigation
