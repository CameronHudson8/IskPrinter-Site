import { HttpError } from "src/errors/HttpError";

export class BadRequest extends HttpError {

    static readonly STATUS_CODE = 400;

    constructor(message: string) {
        super(BadRequest.STATUS_CODE, message || 'Bad request');
    }

}
