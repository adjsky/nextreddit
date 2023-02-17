import React from "react"
import Link from "next/link"
import clsx from "clsx"

const underlineClasses =
  "underline decoration-transparent transition-colors hover:decoration-current"

const UnderlineLink: React.FC<Parameters<typeof Link>[0]> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Link className={clsx(className, underlineClasses)} {...props}>
      {children}
    </Link>
  )
}

export const ExternalUnderlineLink: React.FC<
  React.PropsWithChildren<
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
  >
> = ({ children, className, ...props }) => {
  return (
    <a className={clsx(className, underlineClasses)} {...props}>
      {children}
    </a>
  )
}

export default UnderlineLink
