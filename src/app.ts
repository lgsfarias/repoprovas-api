import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routes/index.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandlerMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the RepoProvas API');
});

export default app;
