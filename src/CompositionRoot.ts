import { ChatGPTClient } from './ChatGPTClient'
import { NetworkService } from './NetworkService/NetworkService'
import { NetworkServiceLive } from './NetworkService/NetworkServiceLive'
import { SlackClient } from './Slack/SlackClient'
import { SlackEventsEndpoint } from './Endpoints/SlackEventsEndpoint'
import { SlackCommandsEndpoint } from './Endpoints/SlackCommandsEndpoint'
import { SlackInteractivityEndpoint } from './Endpoints/SlackInteractivityEndpoint'

export class CompositionRoot {
  static getSlackEventsEndpoint(slackToken: string): SlackEventsEndpoint {
    return new SlackEventsEndpoint(this.getChatGPTClient(), this.getSlackClient(slackToken))
  }

  static getSlackCommandsEndpoint(slackToken: string): SlackCommandsEndpoint {
    return new SlackCommandsEndpoint(this.getChatGPTClient(), this.getSlackClient(slackToken))
  }

  static getSlackInteractivityEndpoint(slackToken: string): SlackInteractivityEndpoint {
    return new SlackInteractivityEndpoint(this.getChatGPTClient(), this.getSlackClient(slackToken))
  }

  private static getChatGPTClient(): ChatGPTClient {
    return new ChatGPTClient(this.getNetworkService())
  }

  private static getSlackClient(token: string): SlackClient {
    return new SlackClient(this.getNetworkService(), token)
  }

  private static getNetworkService(): NetworkService {
    return new NetworkServiceLive()
  }
}
