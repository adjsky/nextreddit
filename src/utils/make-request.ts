import queryString from "query-string"

export type Query = {
  query?: Record<string, any>
}
export type MakeRequestOptions = RequestInit & Query

export function makeRequest(url: string, options?: MakeRequestOptions) {
  const { query, ...otherOptions } = options ?? {}

  const stringifiedQuery = query ? queryString.stringify(query) : null
  const buildedUrl = stringifiedQuery ? `${url}?${stringifiedQuery}` : url

  console.log(buildedUrl)

  return fetch(buildedUrl, otherOptions)
}
