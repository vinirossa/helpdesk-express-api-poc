import express, { Request, Response } from "express";
import {
    HttpGet,
} from "../../utils/decorators/http-method.decorator";
import { HttpStatusCode } from "../../utils/enums/htttp-status-code.enum";
import { Context } from "../../utils/types/context";
import { EnumService } from "./enum.service";

export const router = express.Router();
export const BASE_URL = "/enums";

export class EnumController {
    @HttpGet(router, "/:enum")
    public static getByNameAsync(req: Request, res: Response): void {
        const context: Context = { req, res };

        const result = EnumService.getByName(context, req.params.enum);

        if (result) {
            res.status(HttpStatusCode.Ok).send(result);
        } else {
            res.status(HttpStatusCode.NotFound).send();
        }
    }
}
