import "reflect-metadata";

import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";

import routes from "./routes";
import { fourOFourMiddleware, errorHandlerMiddleware } from "./core/middlewares";

const app = express();

// Midlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :req[body] :req[content-length] :res[content-length] - :response-time ms", {
    skip: (req, _) => req.originalUrl.startsWith("/api/health"),
  })
);

//Set all routes from routes folder
app.use("/api/", routes);
app.use("/api/", fourOFourMiddleware());

app.use(errorHandlerMiddleware());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`⚡️Booster Slack bot app is running on port ${PORT}`);
});
