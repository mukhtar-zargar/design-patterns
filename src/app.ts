import express, { Request, Response } from "express";
import cors from "cors";
import { AppSettings } from "./settings/app.settings";
import { inversifyContainer } from "./ioc_inversify/inversify.config";
import { Warrior } from "./ioc_inversify/interfaces";
import { Types } from "./ioc_inversify/types";

const app = express();

app.use("*", cors());

app.get("/ioc-test", (req: Request, res: Response) => {
  const ninja = inversifyContainer.get<Warrior>(Types.Warrior);

  res.json({
    data: {
      fight: ninja.fight(),
      sneak: ninja.sneak()
    }
  });
});

app.get("/", (_, res) => {
  res.json({
    author: "mukhtar",
    project: "design_patterns",
    description: "Test and implement - Design patterns like IoC, DDD, etc"
  });
});

app.listen(AppSettings.PORT, () => {
  console.log(`Listening on ${AppSettings.PORT}`);
});
