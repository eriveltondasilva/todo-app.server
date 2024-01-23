import express, { json, Request, Response } from 'express';

const app = express();
const port = 3000;

// enable JSON body parser
app.use(json());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () =>
  console.log('🚀 Server ready at: http://localhost:3000')
);

// export default app;
