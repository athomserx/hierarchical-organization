import { ApplicationException } from "./ApplicationException";

export class UnauthorizedException extends ApplicationException {
  constructor(message: string = "Invalid credentials or unauthorized access") {
    super(message, "UnauthorizedException", 401);
  }
}
