import { NetworkService } from "../NetworkService/NetworkService"
import { SlackMessage } from "./SlackMessage"
import { SlackResponse } from "./SlackResponse"

export class SlackClient {
  networkService: NetworkService
  token: string

  constructor(networkService: NetworkService, token: string) {
    this.networkService = networkService
    this.token = token
  }

  async getThreadHistory(channel: string, ts: string): Promise<void> {
    const req = await fetch(`https://slack.com/api/conversations.replies?channel=${channel}&ts=${ts}`, {
      headers: {
        "Authorization": "Bearer " + this.token
      }
    })
    const resp: any = await req.json()
    const messages = resp.messages.filter(messages => !messages.hasOwnProperty('bot_id'));
    const filtered = messages.map(obj => obj.text);
    const regex = /<@.*?>/g;
    const output = filtered.map(line => line.replace(regex, '').trim());
    return output

  }

  async postMessage(message: SlackMessage): Promise<void> {
    await this.post("https://slack.com/api/chat.postMessage", message)
  }

  async postEphemeralMessage(message: SlackMessage): Promise<void> {
    await this.post("https://slack.com/api/chat.postEphemeral", message)
  }

  async postResponse(responseURL: string, response: SlackResponse): Promise<void> {
    await this.post(responseURL, response)
  }

  async deleteMessage(responseURL: string): Promise<void> {
    await this.post(responseURL, {
      delete_original: true
    })
  }

  async openView(triggerId: string, view: any): Promise<void> {
    await this.post("https://slack.com/api/views.open", {
      trigger_id: triggerId,
      view: view
    })
  }

  async updateView(viewId: string, view: any): Promise<void> {
    await this.post("https://slack.com/api/views.update", {
      view_id: viewId,
      view: view
    })
  }

  private async get(url: string) {
    const response = await this.networkService.get(url, {
      "Authorization": "Bearer " + this.token
    })
    this.processResponse(response)
  }

  private async post(url: string, body: any) {
    const response = await this.networkService.post(url, body, {
      "Authorization": "Bearer " + this.token
    })
    this.processResponse(response)
  }

  private async processResponse(response: any) {
    if (!response.ok) {
      const metadata = response.response_metadata
      if (metadata.messages != null && metadata.messages.length > 0) {
        throw new Error(response.error + ": " + metadata.messages[0])
      } else {
        throw new Error(response.error)
      }
    }
  }
}
