export interface NetworkService {
  get(url: string, headers: {[key: string]: string}): Promise<any>
  post(url: string, body: any, headers: {[key: string]: string}): Promise<any>
}