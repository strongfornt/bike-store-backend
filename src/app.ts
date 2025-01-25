import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import  cookieParser from 'cookie-parser'
import router from './app/router';
import notFound from './app/middleware/not-found.api';
import globalErrorHandler from './app/middleware/global.error';

const app: Application = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: ['http://localhost:5173']}));


app.get('/', async (req: Request, res: Response) => {
  res.send("Hello! You're at the starting point of something awesome.");
});

//applications routes
app.use('/api', router)

// // global error handlers
app.use(notFound);
app.use(globalErrorHandler);

// start the server
export default app;
