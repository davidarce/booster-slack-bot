import { VehicleFilter } from "../models/vehicle-filter.model";
import { VehicleInformation } from "../models/vehicle-information.model";

export function buildWelcomeMessage(userId: string, triggerId: string): {} {
  let payload = {
    trigger_id: triggerId,
    view: {
      type: "modal",
      callback_id: "filters_modal",
      title: {
        type: "plain_text",
        text: "Booster Slack Bot",
      },
      submit: {
        type: "plain_text",
        text: "Submit",
        emoji: true,
      },
      close: {
        type: "plain_text",
        text: "Cancel",
        emoji: true,
      },
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hey <@${userId}>, I'm an your Assistant for helping you to find a vehicle. \n\n *Please send me some filters in order to find a vehicle:*`,
          },
        },
        {
          type: "divider",
        },
        {
          type: "input",
          block_id: "field_vin",
          element: {
            type: "plain_text_input",
            action_id: "vin_input-action",
          },
          label: {
            type: "plain_text",
            text: "VIN",
            emoji: false,
          },
        },
        {
          type: "input",
          block_id: "field_make",
          element: {
            type: "plain_text_input",
            action_id: "make_input-action",
          },
          label: {
            type: "plain_text",
            text: "Make",
            emoji: false,
          },
        },
        {
          type: "input",
          block_id: "field_model",
          element: {
            type: "plain_text_input",
            action_id: "model_input-action",
          },
          label: {
            type: "plain_text",
            text: "Model",
            emoji: false,
          },
        },
        {
          type: "input",
          block_id: "field_year",
          element: {
            type: "plain_text_input",
            action_id: "year_input-action",
          },
          label: {
            type: "plain_text",
            text: "Year",
            emoji: false,
          },
        },
        {
          type: "input",
          block_id: "field_fuel_type",
          element: {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Select an item",
              emoji: false,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Diesel",
                  emoji: false,
                },
                value: "Diesel",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Electric",
                  emoji: true,
                },
                value: "Electric",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Gasoline",
                  emoji: true,
                },
                value: "Gasoline",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Compressed Natural Gas (CNG)",
                  emoji: true,
                },
                value: "Compressed Natural Gas (CNG)",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Liquefied Natural Gas (LNG)",
                  emoji: true,
                },
                value: "Liquefied Natural Gas (LNG)",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Compressed Hydrogen/Hydrogen",
                  emoji: true,
                },
                value: "Compressed Hydrogen/Hydrogen",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Liquefied Petroleum Gas (propane or LPG)",
                  emoji: true,
                },
                value: "Liquefied Petroleum Gas (propane or LPG)",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Ethanol (E85)",
                  emoji: true,
                },
                value: "Ethanol (E85)",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Neat Ethanol (E100)",
                  emoji: true,
                },
                value: "Neat Ethanol (E100)",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Methanol (M85)",
                  emoji: true,
                },
                value: "Methanol (M85)",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Neat Methanol (M100)",
                  emoji: true,
                },
                value: "Neat Methanol (M100)",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Flexible Fuel Vehicle (FFV)",
                  emoji: true,
                },
                value: "Flexible Fuel Vehicle (FFV)",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Natural Gas",
                  emoji: true,
                },
                value: "Natural Gas",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Fuel Cell",
                  emoji: true,
                },
                value: "Fuel Cell",
              },
            ],
            action_id: "fuel_type-select-action",
          },
          label: {
            type: "plain_text",
            text: "Fuel type",
            emoji: false,
          },
        },
      ],
    },
  };

  return payload;
}

export function buildProccesingMessage(
  userId: string,
  filters: VehicleFilter
): {} {
  let payload = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:robot_face: <@${userId}> You have sent a new request to find a vehicle:\n*I'm searching a vehicle for you... just one second, filters:*`,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*VIN:* ${filters.vin}`,
          },
          {
            type: "mrkdwn",
            text: `*Make:* ${filters.make}`,
          },
          {
            type: "mrkdwn",
            text: `*Model:* ${filters.model}`,
          },
          {
            type: "mrkdwn",
            text: `*Year:* ${filters.year}`,
          },
          {
            type: "mrkdwn",
            text: `*Fuel type:* ${filters.fuelType}`,
          },
        ],
      },
    ],
  };

  return payload;
}
export function buildValidationMessage(userId: string, errors: any): {} {
  let fields = [];

  for (let key in errors) {
    // ignore key hasError
    if (key === "hasError") {
      continue;
    }

    fields.push({
      type: "mrkdwn",
      text: `*${key}*: :x: ${errors[key]}`,
    });
  }

  let payload = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:cry: <@${userId}> You have sent a new request to find a vehicle:\n*we got some filter errors, please check them out and try again:*`,
        },
      },
      {
        type: "section",
        fields,
      },
    ],
  };

  return payload;
}

export function buildResultMessage(userId: string, foundVehicle: VehicleInformation): {} {
  const title = !foundVehicle
    ? `:cry: Sorry <@${userId}>, I didn't find a vehicle for you with the given filters, please try again`
    : `Hey :wave: <@${userId}>, I found *1 Vehicle* with the given filters`;

  const bodyElements = foundVehicle ? [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${foundVehicle.Make} ${foundVehicle.Model}*\nManufater: ${foundVehicle.Manufacturer}\nVin: ${foundVehicle.VIN}\nYear: ${foundVehicle.ModelYear}`,
      },
      accessory: {
        type: "image",
        image_url:
          "https://static7.depositphotos.com/1062035/744/i/450/depositphotos_7447240-stock-photo-rear-side-view-of-car.jpg",
        alt_text: "side view of car",
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "image",
          image_url:
            "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
          alt_text: "Location Pin Icon",
        },
        {
          type: "plain_text",
          emoji: true,
          text: `Manufacturing plant location: ${foundVehicle.PlantCountry}`,
        },
      ],
    },
    {
      type: "divider",
    },
  ] : [];

  let payload = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: title,
        },
      },
      {
        type: "divider",
      },
      ...bodyElements,
    ],
  };

  return payload;
}
