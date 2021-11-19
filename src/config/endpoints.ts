import config from ".";

const SLACK_API_PATH: string = config.SLACK_API_PATH;
const NHTSA_API_PATH: string = config.NHTSA_API_PATH;

export default {
  postMessage: `${SLACK_API_PATH}chat.postMessage`,
  openModal: `${SLACK_API_PATH}views.open`,
  publishResult: config.SLACK_PUBLISH_RESULT_WEBHOOK_URL,
  getFuelTypes: `${NHTSA_API_PATH}getvehiclevariablevalueslist/fuel%20type%20-%20primary?format=json`,
  getVehicleMakes: `${NHTSA_API_PATH}getvehiclevariablevalueslist/make?format=json`,
  getVehicleModelsByMake: `${NHTSA_API_PATH}getmodelsformake/:make?format=json`,
  decodedVinValues: `${NHTSA_API_PATH}decodevinvalues/:vin?format=json&modelyear=:year`,
};
