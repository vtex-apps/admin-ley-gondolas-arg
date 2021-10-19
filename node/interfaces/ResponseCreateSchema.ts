export interface ResponseCreateSchema {
  config: Config
  request: Request
  response: Response
  isAxiosError: boolean
  errorReportMetadata: ErrorReportMetadata
  name: string
  message: string
  stack: string
  code: string
}

export interface Config {
  baseURL: string
  data: string
  headers: ConfigHeaders
  method: string
  timeout: number
  url: string
  params: Params
}

export interface ConfigHeaders {
  Accept: string
  'Content-Type': string
  'accept-encoding': string
  'user-agent': string
  'x-forwarded-host': string
  'x-vtex-operation-id': string
  'Content-Length': number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Params {}

export interface ErrorReportMetadata {
  errorId: string
  reportCount: number
}

export interface Request {
  finished: boolean
  method: string
  path: string
}

export interface Response {
  data: string
  headers: ResponseHeaders
  status: number
}

export interface ResponseHeaders {
  date: string
  server: string
  'cache-control': string
  pragma: string
  expires: string
  'set-cookie': string[]
  'x-aspnet-version': string
  'x-powered-by': string
  'x-vtex-janus-router-backend-app': string
  'x-vtex-took': string
  'x-request-id': string
  'x-vtex-router-version': string
  'x-vtex-backend-status-code': string
  'x-vtex-backend-elapsed-time': string
  'x-vtex-router-elapsed-time': string
  'x-vtex-io-cluster-id': string
}
