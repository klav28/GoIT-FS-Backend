import express from "express";
import logger from "morgan";
import cors from "cors";

import usersRouter from "./routes/api/auth-router.js";
import boardRouter from "./routes/api/board-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/board", boardRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Default server error" } = err;
  res.status(status).json({ message });
});

export default app;
