export const communities = [
  "hot",
  "top",
  "new",
  "rising",
  "controversial"
] as const
export type Community = (typeof communities)[number]
