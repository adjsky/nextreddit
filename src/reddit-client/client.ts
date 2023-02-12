import "server-only"
import { env } from "../env/server.mjs"
import type { AccessTokenData } from "./types.js"

class RedditClient {
  private oauthToken = ""

  private async accessToken() {
    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            env.REDDIT_CLIENT_ID + ":" + env.REDDIT_CLIENT_SECRET
          ).toString("base64")
      },
      body: "grant_type=https://oauth.reddit.com/grants/installed_client&device_id=DO_NOT_TRACK_THIS_DEVICE",
      method: "POST"
    })

    if (!response.ok) {
      throw new Error("could not access oauth token")
    }

    const json: AccessTokenData = await response.json()
    this.oauthToken = json.access_token
  }

  public async request<T>(
    uri: string,
    options?: RequestInit,
    reinvokeToken?: boolean
  ): Promise<T> {
    console.log(uri, reinvokeToken)
    if (reinvokeToken || this.oauthToken == "") {
      await this.accessToken()
    }

    const url = `https://oauth.reddit.com${uri}`
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.oauthToken}`
      }
    })

    if (response.status == 401 && !reinvokeToken) {
      return this.request(uri, options, true)
    }

    if (!response.ok) {
      throw new Error(`url: ${url}, response: ${await response.text()}`)
    }

    return response.json()
  }
}

const redditClient = new RedditClient()

export default redditClient