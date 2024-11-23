import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BikeRoutes } from './app/modules/bike/bike.route';

const app:Application = express();
app.use(express.json());
app.use(cors())
// application routes 
app.use('/api/bikes', BikeRoutes)


app.get('/', (req:Request, res:Response) => {
    console.log('Hello from server');
    
})


export default app;