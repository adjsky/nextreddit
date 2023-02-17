# libreddit but nextreddit

written using next13 (app dir)

## known next13-related bugs

- when clicking back/forward buttons posts won't be updated (for some reason query params are updated in the url but next ignores that) https://github.com/vercel/next.js/issues/45026#issuecomment-1410871154
- when clicking next/link scroll to the top is not applied https://github.com/vercel/next.js/issues/45187
- when moving between pages with query params no skeletons will be visible (loading.tsx is triggered only on initial load) https://github.com/vercel/next.js/discussions/41745#discussioncomment-5003328
