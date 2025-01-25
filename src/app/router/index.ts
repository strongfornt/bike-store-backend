import { Router } from "express";
import { BikeRoutes } from "../modules/bike/bike.route";
import { OrderBikeRoutes } from "../modules/order-bike/order.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/products",
    route: BikeRoutes,
  },
  {
    path: "/orders",
    route: OrderBikeRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
