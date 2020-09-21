import express from 'express';
import http from 'http';

const router = express.Router();

router.post('/', function (req, res, next) {
  

  res.sendStatus(501);
});

export default router;
