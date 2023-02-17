import React from "react"
import Link from "next/link"
import clsx from "clsx"

const UnderlineLink: React.FC<Parameters<typeof Link>[0]> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Link
      className={clsx(
        className,
        "underline decoration-transparent transition-colors hover:decoration-current"
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export default UnderlineLink
