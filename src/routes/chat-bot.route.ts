import { Router, Request, Response, NextFunction } from "express";
import ChatBotVehiclesController from "../controllers/chat-bot.controller";

const chatBotRouter = Router();

// webhook chat for find vehicle for a given parameters
chatBotRouter.post("/vehicles",
  (request: Request, response: Response, next: NextFunction) =>
    ChatBotVehiclesController.receiveEvent(request, response, next)
);

// webhook chat for find vehicle for a given parameters
chatBotRouter.post("/verify", (request: Request, response: Response, next: NextFunction) => {
   return response.status(200).send(request.body.challenge);
  }   
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
