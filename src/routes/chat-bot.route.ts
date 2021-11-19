import { Router, Request, Response, NextFunction } from "express";
import ChatBotVehiclesController from "../controllers/chat-bot.controller";

const chatBotRouter = Router();

// webhook to verify the chat bot
chatBotRouter.post("/verify", (request: Request, response: Response, next: NextFunction) => {
   return response.status(200).send(request.body.challenge);
  }   
);

// webhook chat for listening command event to find vehicle for a given parameters
chatBotRouter.post("/events",
  (request: Request, response: Response, next: NextFunction) =>
    ChatBotVehiclesController.processInteractiveEvent(request, response, next)
);

export default chatBotRouter;
