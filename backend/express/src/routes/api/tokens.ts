import express, { Request, Response, NextFunction } from 'express';

import { RequiredParams, RequestValidator } from 'src/tools/RequestValidator';
import { HttpError } from 'src/errors/HttpError';
import { AuthenticationController } from 'src/controllers/Authentication';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {

  try {

      const requiredParams: RequiredParams = {
        body: [ 'code' ],
        query: [],
      };
      (new RequestValidator(requiredParams)).validate(req);
      const accessToken = await (new AuthenticationController).getTokenFromCode(req.body.code);
      return res.json({ accessToken });
    
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send(error.message);
    }
    console.error(error);
    return res.sendStatus(500);
  }

});

export default router;
