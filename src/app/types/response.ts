import { Response } from 'express'

/** @desc Interface for Model **/
export interface IResponse {
  ok(res: Response, body?: any): void
  created(res: Response, body: any): void
  noContent(res: Response): void
  badRequest(res: Response, body: any): void
  unauthorized(res: Response, body: any): void
  notFound(res: Response, body: any): void
  serverError(res: Response, body: any): void
}
