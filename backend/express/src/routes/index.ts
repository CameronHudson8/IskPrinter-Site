import express from 'express';
const router = express.Router();

import apiRoutes from 'src/routes/api';
router.use('/api', apiRoutes);

router.get('/', (req: any, res: any, next: any) => {
  res.sendStatus(200);
});

export default router;
