import express from "express";

import {authenticate, isEmptyBody} from "../../middleware/index.js";
import {validateBody} from "../../decorators/index.js";
import needHelpController from "../../controllers/needHelpController.js";

import needHelpSchema from '../../schemas/need-help-joischeme.js'

const sendEmailRouter = express.Router({ strict: true });

sendEmailRouter.post("/",
    isEmptyBody,
    validateBody(needHelpSchema.needHelpSchema),
    authenticate,
    needHelpController.postNeedHelp);

export default sendEmailRouter