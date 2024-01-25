import type { Response } from 'express'
import type { IResponse } from '../../app/@types/response'

/**
 * @class Response Service Class
 * @description A service class for handling HTTP responses with standardized status codes.
 **/
class ResponseService implements IResponse {
  private status = StatusEnum

  //# RESPONSE SERVICE METHODS
  // --------------------------
  sendResponse(res: Response, code: StatusEnum, body?: any) {
    return res.status(code).json(body)
  }

  // --------------------------
  ok(res: Response, body: any) {
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

  notFound(res: Response, body: any) {
    return this.sendResponse(res, this.status.NOT_FOUND, body)
  }

  serverError(res: Response, body: any) {
    return this.sendResponse(res, this.status.SERVER_ERROR, body)
  }
}

//
enum StatusEnum {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

// --------------------------
export default ResponseService
