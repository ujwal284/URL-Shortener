import express from "express";
import urlRoutes from "./routes/url.routes.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/", urlRoutes);

export default app;