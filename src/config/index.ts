import { getEnvironment } from '../utils/environment.util';
import development from './env/development';
import production from './env/production';

interface IConfig {
  SLACK_API_PATH: string;
  SLACK_BOT_TOKEN: string;
  SLACK_SIGNING_SECRET: string;
  SLACK_PUBLISH_RESULT_WEBHOOK_URL: string;
  NHTSA_API_PATH: string;
}

interface IEnvironment {
  [key: string]: IConfig;
}

const configuration: IEnvironment = {
  development,
  production,
};

export default configuration[getEnvironment()];
