import express from "express";

import boardRouter from "./board-router.js";
import boardIconRouter from "./board-icon-route.js";
import boardBackgroundRouter from "./board-background-route.js";
import boardColumnRouter from "./board-column-route.js";

const boardRouters = express.Router();

boardRouters.use('/icon', boardIconRouter)
boardRouters.use('/background', boardBackgroundRouter)
boardRouters.use('/', boardColumnRouter)
boardRouters.use('/', boardRouter)

export default boardRouters