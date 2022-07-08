import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "../../../utils/classes/base-response.class";
import { HttpStatusCode } from "../../../utils/enums/htttp-status-code.enum";
import { BusinessError } from "../../../utils/errors/business.error";

export function errorHandler(
    err: BusinessError | Error,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    if (err instanceof BusinessError) {
        res
            .status(HttpStatusCode.BadRequest)
            .send(new BaseResponse(
                err.name,
                err.message,
                HttpStatusCode.BadRequest,
                err.details ? err.details : undefined,
            ));
    } else {
        res
            .status(HttpStatusCode.InternalServerError)
            .send(new BaseResponse(
                err.name,
                err.message,
                HttpStatusCode.InternalServerError,
                err.toString(),
            ));
    }

    next(err);
}
