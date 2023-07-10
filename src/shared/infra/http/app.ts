import { config } from "dotenv";
import express from "express";
import { InitializeConnection } from "../typeorm";
import cors from "cors";
import { Routes } from "./routes";
import { errors } from "celebrate";
config();

const app = express();
InitializeConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", Routes);
app.use(errors());

export { app };
