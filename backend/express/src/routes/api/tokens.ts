import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { RequiredParams, RequestValidator } from 'src/tools/RequestValidator';
import { HttpError } from 'src/errors/HttpError';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {

  const requiredParams: RequiredParams = {
    body: [ 'code' ],
    query: [],
  };
  
  try {

    (new RequestValidator(requiredParams)).validate(req);

    const basicAuth = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
    const encodedBasicAuth = Buffer.from(basicAuth).toString('base64');
    const config = {
      headers: {
        Authorization: `Basic ${encodedBasicAuth}`
      }
    };
    const body = {
      grant_type: 'authorization_code',
      code: req.body.code
    };
    try {
      const eveResponse = await axios.post('https://login.eveonline.com/oauth/token', body, config)
      return res.json({ accessToken: eveResponse.data.access_token });
    } catch (error) {
      console.error(error);
      throw new HttpError(error.response.status, error.response.statusText);
    }
    
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send(error.message);
    }
    console.error(error);
    return res.sendStatus(500);
  }

});

export default router;
