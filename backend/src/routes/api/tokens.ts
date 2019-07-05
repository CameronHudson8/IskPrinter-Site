import express from 'express';
const router = express.Router();

router.post('/', function (req, res, next) {
  res.send('respond with a token');
});

router.get('/', function (req, res, next) {
  res.send('respond with a token');
});

export default router;
