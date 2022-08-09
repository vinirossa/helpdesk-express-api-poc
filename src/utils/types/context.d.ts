import { Request, Response } from "express";

type Context = {
    readonly req: Request<any, any, any, any>;
    readonly res: Response,
};
