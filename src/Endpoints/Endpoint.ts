export interface Endpoint {
  fetch(request: Request, Env: any, ctx: ExecutionContext): Promise<Response>
}
