import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller()
export class HealthController {
  constructor() {}

  @Get()
  getHello() {
    return {
      status: "OK",
      health: "Good",
      code: 200,
    };
  }
  @Get("/express-health")
  getHealth(@Req() req: Request, @Res() res: Response): void {
    console.log(req.path);

    res.status(200).json({
      status: "ok",
      health: "good",
      code: 200,
    });
  }
}
