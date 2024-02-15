import ResponseStatus from '@/enums/responseStatus'

// ====================================
abstract class BaseError extends Error {
  constructor(
    public message: string,
    public status: ResponseStatus,
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

// ----------------------------------
export class UnauthorizedError extends BaseError {
  constructor(public message: string = 'Unauthorized') {
    super(message, ResponseStatus.UNAUTHORIZED)
  }
}

export class ConflictError extends BaseError {
  constructor(public message: string = 'Conflict') {
    super(message, ResponseStatus.CONFLICT)
  }
}

export class NotFoundError extends BaseError {
  constructor(public message: string = 'Not Found') {
    super(message, ResponseStatus.NOT_FOUND)
  }
}
