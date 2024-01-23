import express, { Express, Request, Response } from 'express';

import Server from './server';

const app: Express = express();

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

Server.start(app);
