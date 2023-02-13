import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    mm: "%dm",
    hh: "%dh",
    dd: "%dd",
    MM: "%dm",
    yy: "%dy",
    s: "a few seconds",
    m: "a minute",
    h: "an hour",
    d: "a day",
    M: "a month",
    y: "a year"
  }
})

export function date(timestamp: number) {
  const timestampDate = dayjs.unix(timestamp)

  if (timestampDate.add(1, "month").isAfter(dayjs())) {
    return timestampDate.fromNow()
  }

  return timestampDate.format("MMM DD 'YY")
}
