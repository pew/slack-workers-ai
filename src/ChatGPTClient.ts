import { Env } from './Env'
import { Ai } from '@cloudflare/ai'
import { NetworkService } from './NetworkService/NetworkService'

export class ChatGPTClient {
  networkService: NetworkService

  constructor(networkService: NetworkService) {
    this.networkService = networkService
  }

  async getResponse(prompt: { role: string; content: string }[], env: Env): Promise<string> {
    const ai = new Ai(env.AI)
    const body = {
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful and friendly assistant. You answer clearly and concisely to the given input, no matter the question and context. If you do not know the answer, you will state that insead of making things up.',
        },
      ],
    }

    Array.from(prompt).forEach((message) => body.messages.push({ role: message.role, content: message.content }))
    const messages = body.messages
    const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', { messages })
    return response.response
  }
}
