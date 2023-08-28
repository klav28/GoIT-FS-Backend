import express from "express";

import boardRouter from "./board-router.js";
import boardIconRouter from "./board-icon-route.js";
import boardBackgroundRouter from "./board-background-route.js";

const boardRouters = express.Router({ strict: true });

boardRouters.use('/icon', boardIconRouter)
boardRouters.use('/background', boardBackgroundRouter)
boardRouters.use('/', boardRouter)

export default boardRouters