import { ApplicationException } from "./ApplicationException";

export class NotFoundException extends ApplicationException {
  constructor(resource: string = "Resource") {
    super(`${resource} not found.`, "NotFoundException", 404);
  }
}
