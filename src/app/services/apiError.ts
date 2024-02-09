import ResponseStatus from '../enums/responseStatus'

class ApiError extends Error {
  constructor(
    public status: ResponseStatus,
    public message: string,
  ) {
    super(message)
    this.status = status || 500
    Error.captureStackTrace(this, this.constructor)
  }
}

// --------------------------------
export default ApiError
