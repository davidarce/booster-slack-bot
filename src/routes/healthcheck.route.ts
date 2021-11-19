import { Router } from "express";

const healthcheckRouter = Router();
// get status
healthcheckRouter.get("/", require('express-healthcheck')());

export default healthcheckRouter;
