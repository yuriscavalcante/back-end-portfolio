import { Router } from "express";
import { healthCheck } from "./heathCheck.routes";

const Routes = Router();

Routes.use("/healthcheck", healthCheck);

export { Routes };
