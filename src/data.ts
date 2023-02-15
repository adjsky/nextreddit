export const communities = [
  "hot",
  "new",
  "top",
  "rising",
  "controversial"
] as const
export type Community = (typeof communities)[number]
