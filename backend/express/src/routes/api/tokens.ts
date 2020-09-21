import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const router = express.Router();

interface RequiredParams {
  query: string[],
  body: string[]
}

const withCorrectParams = (requiredParams: RequiredParams, request: Request, res: Response, next: NextFunction) => {
  for (const param of requiredParams.body) {
    if (!request.body[param]) {
      res.statusCode = 400;
      res.statusMessage = `The request body must include "${param}".`;
      return res.send();
    }
  }
  return next();
};

router.post('/', function (req: Request, res: Response, next: NextFunction) {

  const requiredParams = {
    query: [],
    body: [
      'code',
      'clientId'
    ]
  };
  withCorrectParams(requiredParams, req, res, () => {

    const basicAuth = `${req.body.clientId}:${process.env.CLIENT_SECRET}`;
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
    axios.post('https://login.eveonline.com/oauth/token', body, config)
      .then((eveResponse) => {

        res.statusCode = eveResponse.status
        res.json(eveResponse.data);

      }).catch((eveError) => {

        console.error(eveError);

        res.statusCode = eveError.response.status;
        res.statusMessage = eveError.response.statusText;
        res.send();

      });

  });


});

export default router;
