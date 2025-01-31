import { Router } from "express";
import { BikeRoutes } from "../modules/bike/bike.route";
import { OrderBikeRoutes } from "../modules/order-bike/order.route";
import { UserRoute } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { AdminRoute } from "../modules/admin/admin.route";

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
  {
    path: "/users",
    route: UserRoute,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },,
  {
    path: "/admin",
    route:AdminRoute
  }
];

modulesRoutes.forEach((route) => router.use(route!.path, route!.route));

export default router;
