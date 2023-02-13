"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"

const navigation = [
  {
    title: "Hot",
    href: "/"
  },
  {
    title: "New",
    href: "/new"
  },
  {
    title: "Top",
    href: "/top"
  },
  {
    title: "Rising",
    href: "/rising"
  },
  {
    title: "Controversial",
    href: "/controversial"
  }
]

const CommunityNavigation: React.FC = () => {
  const pathname = usePathname()

  return (
    <nav className="overflow-hidden rounded-md">
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
