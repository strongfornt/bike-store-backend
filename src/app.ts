import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { BikeRoutes } from "./app/modules/bike/bike.route";
import { GlobalErrorFunc } from "./app/global-error-handler";
import { OrderBikeRoutes } from "./app/modules/order-bike/order.route";

// import unHandledError from "./app/global-error-handler";

const app: Application = express();
app.use(express.json());
app.use(cors());
// application routes
app.use("/api/products", BikeRoutes);
app.use("/api/orders", OrderBikeRoutes);

app.get("/", (req: Request, res: Response) => {
  console.log("Hello from server");
});


// Error handlers globally  ==========
//handling 404 error
app.use(GlobalErrorFunc.notFoundUrlError);

// handle unHandledError (eg: server or any others)
app.use(GlobalErrorFunc.unHandledError);

export default app;
