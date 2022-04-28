import express, { Application } from 'express';
import { router } from '../routes';

export const createApp = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', router);

  app.get('/home', (_req, res) => {
    res.send('Proximamente');
  });

  return app;
};
