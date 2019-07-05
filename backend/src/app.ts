import express from 'express';
import logger from 'morgan';

import apiRoutes from 'src/routes/api';

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

export default app;
