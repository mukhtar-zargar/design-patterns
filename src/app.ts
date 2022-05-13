import express, { Request, Response } from "express";
import cors from "cors";
import "reflect-metadata";
import morgan from "morgan";

import { AppSettings } from "./settings/app.settings";
import { inversifyContainer } from "./ioc_inversify/inversify.config";
import { Warrior } from "./ioc_inversify/interfaces";
import { Types } from "./ioc_inversify/types";

import { Container } from "inversify";
import {
  interfaces,
  InversifyExpressServer,
  TYPE
} from "inversify-express-utils";

import "./ioc_inversify/controller";

let container = new Container();

let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // app.use(bodyParser.urlencoded({extended: true}))
  // app.use(bodyParser.json());
  const logger = morgan("combined");
  app.use(logger);
});

server.setErrorConfig((app) => {
  app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).send("Something broke");
  });
});

let app = server.build();
app.listen(AppSettings.PORT, () => {
  console.log(`Listening on ${AppSettings.PORT}`);
});

// const app = express();

// app.use("*", cors());

// app.get("/ioc-test", (req: Request, res: Response) => {
//   const ninja = inversifyContainer.get<Warrior>(Types.Warrior);

//   res.json({
//     data: {
//       fight: ninja.fight(),
//       sneak: ninja.sneak()
//     }
//   });
// });

// app.get("/", (_, res) => {
//   res.json({
//     author: "mukhtar",
//     project: "design_patterns",
//     description: "Test and implement - Design patterns like IoC, DDD, etc"
//   });
// });

// app.listen(AppSettings.PORT, () => {
//   console.log(`Listening on ${AppSettings.PORT}`);
// });
