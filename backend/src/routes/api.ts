import express from 'express';
const router = express.Router();

import tokenRoutes from 'src/routes/api/tokens';

router.use('/tokens', tokenRoutes);

export default router;
