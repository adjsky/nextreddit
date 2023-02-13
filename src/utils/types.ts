import type { ReactNode } from "react"

export type SearchParamValue = string | string[] | undefined
export type SearchParams = { [key: string]: SearchParamValue }

export type NextPageProps<T = unknown> = {
  params?: T extends string ? Record<T, string> : unknown
  searchParams?: SearchParams
}
export type NextPage<T = unknown> = (props: NextPageProps<T>) => ReactNode

export type NextPageOptional<T = unknown> = (props: {
  params?: T extends string ? Record<T, string[] | undefined> : unknown
  searchParams?: SearchParams
}) => ReactNode
