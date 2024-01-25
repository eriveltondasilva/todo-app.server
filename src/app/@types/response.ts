import { Response } from 'express'

export interface IResponse {
  ok(res: Response, body: any): void
  created(res: Response, body: any): void
  noContent(res: Response): void
  badRequest(res: Response, body: any): void
  notFound(res: Response, body: any): void
}
