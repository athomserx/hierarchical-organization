export class ApplicationException extends Error {
  public readonly statusCode: number = 500;

  constructor(
    message: string,
    name: string = "ApplicationException",
    statusCode?: number
  ) {
    super(message);
    this.name = name;

    if (statusCode) {
      this.statusCode = statusCode;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationException);
    }
  }
}
