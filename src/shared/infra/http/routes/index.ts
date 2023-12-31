import { Router } from "express";
import { healthCheck } from "./heathCheck.routes";
import { userRoutes } from "./user.routes";
import { companiesRoutes } from "./companies.routes";

const Routes = Router();

Routes.use("/healthcheck", healthCheck);
Routes.use("/user", userRoutes);
Routes.use("/company", companiesRoutes);

export { Routes };
