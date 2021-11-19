import configuration from "../../config";
import endpoints from "../../config/endpoints";
import axios, { AxiosInstance } from "axios";

import { Event } from "../../models/event.model";
import { InteractiveEvent } from "../../models/interactive-event.model";
import { SubmitEvent } from "../../models/submit-event.model";
import { VehicleFilter } from "../../models/vehicle-filter.model";

import * as builderMessage from "../../utils/builder-message.util";

import { NhtsaAPIService, nhtsaAPIService } from "../nhtsa-api";
import {
  FilterValidatorService,
  filterValidatorService,
} from "../filter-validator";

const BOT_USER_ID = "U02MSSZDBGU";

export class ChatBotService {
  constructor(
    private readonly connector: AxiosInstance,
    private readonly nhtsaService: NhtsaAPIService,
    private readonly filterValidatorService: FilterValidatorService
  ) {}

  async processEvent(event: Event) {
    console.log("Processing event: ", event);

    if (event.text.includes(BOT_USER_ID)) {
      if (
        event.text.includes("hey") ||
        event.text.includes("hello") ||
        event.text.includes("hi") ||
        event.text.includes("find") ||
        event.text.includes("find me")
      ) {
        await this.sendMessage(event.channel, event.user);
      } else if (event.text.includes("filters")) {
        await this.sendMessage(
          event.channel,
          event.user,
          "I'm searching a vehicle..."
        );
      }
    }
  }

  async processInteractiveEvent(interactiveEvent: InteractiveEvent) {
    console.log(
      "Processing interactive event with triggerId: ",
      interactiveEvent.trigger_id
    );
    try {
      const body = builderMessage.buildWelcomeMessage(
        interactiveEvent.user_id,
        interactiveEvent.trigger_id
      );
      await this.connector.post(endpoints.openModal, body);
    } catch (error) {
      console.log("Error opening modal: ", error);
    }
  }

  async processSubmitEvent(submitEvent: SubmitEvent) {
    console.log("Processing submit event for user: ", submitEvent.user.id);
    try {
      let vehicleFilters: VehicleFilter = new VehicleFilter(
        submitEvent.view.state.values
      );

      //Send a message to the user for processing
      await this.connector.post(
        endpoints.publishResult,
        builderMessage.buildProccesingMessage(
          submitEvent.user.id,
          vehicleFilters
        )
      );

      //Validate filters
      const errors = await this.filterValidatorService.validateFilters(
        vehicleFilters
      );

      if (errors.hasError) {
        //Send a message to the user with the errors
        await this.connector.post(
          endpoints.publishResult,
          builderMessage.buildValidationMessage(submitEvent.user.id, errors)
        );
      } else {
        // search vehicle
        const foundVehicle = await this.nhtsaService.searchVehicle(vehicleFilters);

        //Send a message to the user with the result
        await this.connector.post(
          endpoints.publishResult,
          builderMessage.buildResultMessage(submitEvent.user.id, foundVehicle)
        );
       
      }
    } catch (error) {
      console.log("Error processing submit event: ", error);
    }
  }

  private async sendMessage(channel: string, userId: string, result?: any) {
    try {
      if (!result) {
        //et blocks = this.buildWelcomeMessage(userId);
        const body = { channel, text: "Hello World" };
        await this.connector.post(endpoints.postMessage, body);
      } else {
        // we assume that the message is for send a result
      }
    } catch (error) {
      console.log("Error sending message: ", error);
    }
  }
}

export const chatBotService = new ChatBotService(
  axios.create({
    timeout: 5000,
    headers: { Authorization: `Bearer ${configuration.SLACK_BOT_TOKEN}` },
  }),
  nhtsaAPIService,
  filterValidatorService
);
