import ResponseStatus from '@/enums/responseStatus'
import type { Response } from 'express'

// interface
export interface IResponse {
  ok(res: Response, body?: any): void
  created(res: Response, body: any): void
  noContent(res: Response): void
  badRequest(res: Response, body: any): void
  unauthorized(res: Response, body: any): void
  notFound(res: Response, body: any): void
  serverError(res: Response, body: any): void
}

/** @class Response Service Class */
class ResponseService implements IResponse {
  protected readonly status = ResponseStatus

  //# RESPONSE SERVICE METHODS
  // --------------------------
  sendResponse(res: Response, code: number, body?: any) {
    return res.status(code).json(body)
  }

  // --------------------------
  ok(res: Response, body?: any) {
    return this.sendResponse(res, this.status.OK, body)
  }

  created(res: Response, body: any) {
    return this.sendResponse(res, this.status.CREATED, body)
  }

  noContent(res: Response) {
    return this.sendResponse(res, this.status.NO_CONTENT)
  }

  badRequest(res: Response, body: any) {
    return this.sendResponse(res, this.status.BAD_REQUEST, body)
  }

  unauthorized(res: Response, body: any) {
    return this.sendResponse(res, this.status.UNAUTHORIZED, body)
  }

  notFound(res: Response, body: any) {
    return this.sendResponse(res, this.status.NOT_FOUND, body)
  }

  serverError(res: Response, body: any) {
    return this.sendResponse(res, this.status.SERVER_ERROR, body)
  }
}

// --------------------------
export default ResponseService
