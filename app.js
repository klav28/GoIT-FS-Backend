import express from "express";
import logger from "morgan";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import usersRouter from "./routes/api/auth-router.js";
import boardRouters from "./routes/api/board/index.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "GoIT FS backend",
      version: "0.1.0",
      description: "",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "https://taskpro-backend-zulp.onrender.com",
      },
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [
    "./routes/api/board/*.js",
    "./routes/api/*.js",
    "./models/*.js",
    "./helpers/HttpError.js",
  ],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use("/api/users", usersRouter);
app.use("/api/board", boardRouters);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Default server error" } = err;
  res.status(status).json({ message });
});

export default app;
