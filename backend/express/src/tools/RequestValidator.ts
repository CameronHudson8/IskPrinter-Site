import { Request } from 'express';

import { BadRequest } from 'src/errors/BadRequest';

export interface RequiredParams {
    body: string[];
    query: string[];
}

export class RequestValidator {

    requiredParams: RequiredParams;

    constructor(requiredParams: RequiredParams) {
        this.requiredParams = requiredParams;
    }

    public validate(request: Request): boolean {
        if (request === null) {
            throw new Error('Request cannot be null.');
        }
        for (const param of this.requiredParams.body) {
            if (!(param in request.body)) {
                throw new BadRequest(`Body parameter '${param}' is required.`);
            }
        }
        for (const param of this.requiredParams.query) {
            if (!(param in request.query)) {
                throw new BadRequest(`Query parameter '${param}' is required.`);
            }
        }
        return true;
    };

}

