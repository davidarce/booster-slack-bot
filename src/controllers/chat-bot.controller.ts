import { NextFunction, Request, Response } from "express";
import { InteractiveEvent } from "../models/interactive-event.model";
import { SubmitEvent } from "../models/submit-event.model";
import { ChatBotService, chatBotService } from "../services/chat-bot";
import * as httpStatus from "http-status";

class ChatBotVehiclesController {
  constructor(private readonly service: ChatBotService) {}

  async processInteractiveEvent(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(httpStatus.OK).send();

      // We asume that the event is a starter event when trigger_id is found
      if (request.body.trigger_id) {
        let interactiveEvent: InteractiveEvent = request.body;
        await this.service.processInteractiveEvent(interactiveEvent);
      } else {
        let submitEvent: SubmitEvent = JSON.parse(request.body.payload);
        await this.service.processSubmitEvent(submitEvent);
      }
    } catch (error) {
      console.log("Error: ", error);
      next(error);
    }
  }
}

export default new ChatBotVehiclesController(chatBotService);
