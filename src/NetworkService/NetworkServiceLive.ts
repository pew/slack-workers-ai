import { NetworkService } from './NetworkService'

export class NetworkServiceLive implements NetworkService {
  async get(url: string, headers: { [key: string]: string }): Promise<any> {
    // TODO: add this to the actual code
    let allHeaders = headers || {}
    allHeaders['Content-Type'] = 'application/json;charset=utf-8'
    return await fetch(url, {
      method: 'GET',
      headers: allHeaders,
    })
  }
  async post(url: string, body: any, headers: { [key: string]: string }): Promise<any> {
    let allHeaders = headers || {}
    allHeaders['Content-Type'] = 'application/json;charset=utf-8'
    return await fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: allHeaders,
    })
  }
}
