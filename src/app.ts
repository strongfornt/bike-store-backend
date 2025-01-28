import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
// import router from './app/router';
import globalErrorHandler from './app/middleware/global.error';
import notFound from './app/middleware/not-found.api';
import router from './app/router';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }));


app.get('/', async (req: Request, res: Response) => {
 try {
  res.send("Hello! You're at the starting point of something awesome.");
 } catch (error) {
    res.send("Something went wrong")
 }
});

//applications routes
app.use('/api', router)

// // global error handlers
app.use(notFound);
app.use(globalErrorHandler);

// start the server
export default app;
