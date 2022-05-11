import express from "express";
import cors from "cors";
import { AppSettings } from "./settings/app.settings";

const app = express();

app.use("*", cors());

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
