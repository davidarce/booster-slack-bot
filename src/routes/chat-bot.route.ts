import { Router, Request, Response, NextFunction } from "express";
import ChatBotVehiclesController from "../controllers/chat-bot.controller";

const chatBotRouter = Router();

// webhook chat for find vehicle for a given parameters
chatBotRouter.post("/vehicles",
  (request: Request, response: Response, next: NextFunction) =>
    ChatBotVehiclesController.receiveEvent(request, response, next)
);
/* 
chatBotRouter.post("/messages",
  (request: Request, response: Response, next: NextFunction) =>
    ChatBotVehiclesController.receiveEvent(request, response, next)
); */

chatBotRouter.post("/events",
  (request: Request, response: Response, next: NextFunction) =>
    ChatBotVehiclesController.processInteractiveEvent(request, response, next)
);

export default chatBotRouter;
