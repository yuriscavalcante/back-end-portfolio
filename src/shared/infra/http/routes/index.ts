import { Router } from "express";
import { healthCheck } from "./heathCheck.routes";
import { userRoutes } from "./user.routes";

const Routes = Router();

Routes.use("/healthcheck", healthCheck);
Routes.use("/user", userRoutes);

export { Routes };
