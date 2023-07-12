import "reflect-metadata";
import "express-async-errors";
import "../../container";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { errors } from "celebrate";
import { InitializeConnection } from "../typeorm";
import { Routes } from "./routes";
import { catchErros } from "./middlewares/catchErrors";

config();

const app = express();
InitializeConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", Routes);
app.use(errors());
app.use(catchErros);

export { app };
