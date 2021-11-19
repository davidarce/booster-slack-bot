import { Router } from "express";
import chatBotRoute from "./chat-bot.route";
import healthcheckRoute from "./healthcheck.route";

const routes = Router();

routes.use("/chat", chatBotRoute);
routes.use("/health", healthcheckRoute);

export default routes;
