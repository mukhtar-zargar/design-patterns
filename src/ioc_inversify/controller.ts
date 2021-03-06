import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  next,
  request,
  requestParam,
  response
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { NextFunction, Request, Response } from "express";
import { boot } from "../kafka/producer";

@controller("/inversify")
export class InversifyController implements interfaces.Controller {
  constructor() {}

  // @httpGet("/:id")
  private index(
    @requestParam("id") id: string,
    // @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): string {
    return id;
  }

  @httpGet("/kafka-msg")
  private async create(
    @request() req: Request,
    @response() res: Response
  ): Promise<{ message: string }> {
    try {
      // throw Error("Errorororor");
      // console.log(req.body);
      boot().catch((err) => console.log("kafka error", err));
      res.status(200);
      return {
        message: "Success"
      };
    } catch (err) {
      res.status(400);
      // throw Error("Brrrr");
      return {
        message: "Error"
      };
    }
  }
}
