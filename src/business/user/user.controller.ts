import express, { Request, Response } from "express";
import {
    HttpDelete, HttpGet, HttpPost, HttpPut,
} from "../../utils/decorators/http-method.decorator";
import { HttpStatusCode } from "../../utils/enums/htttp-status-code.enum";
import { BusinessError } from "../../utils/errors/business.error";
import { isEmptyObject } from "../../utils/functions/is-empty-object.function";
import { UserService } from "./user.service";
import { UserViewModel } from "./user.view.model";
import { UserViewModelValidator } from "./user.view.model.validator";

export const router = express.Router();
export const BASE_PATH = "/users";

export class UserController {
    private static validator = new UserViewModelValidator();

    @HttpGet(router)
    public static async getAllAsync(req: Request, res: Response): Promise<void> {
        const result = await UserService.getAllAsync();
        res.status(HttpStatusCode.Ok).send(result);
    }

    @HttpGet(router, "/:id")
    public static async getAsync(req: Request, res: Response): Promise<void> {
        const result = await UserService.getAsync(req.params.id);

        if (result) {
            res.status(HttpStatusCode.Ok).send(result);
        } else {
            res.status(HttpStatusCode.NotFound).send({});
        }
    }

    @HttpPost(router)
    public static async insertAsync(req: Request, res: Response): Promise<void> {
        const model: UserViewModel = { ...req.body };

        const errors = UserController.validator.validate(model);
        if (isEmptyObject(errors)) {
            throw new BusinessError("Invalid model", errors);
        }

        const result = await UserService.insertAsync(model);
        res.status(HttpStatusCode.Created).send(result);
    }

    @HttpPut(router)
    public static async updateAsync(req: Request, res: Response): Promise<void> {
        const model: UserViewModel = { ...req.body };

        const errors = UserController.validator.validate(model);
        if (isEmptyObject(errors)) {
            throw new BusinessError("Invalid model", errors);
        } else if (!model.id) {
            throw new BusinessError("Invalid model", { id: "Id is required" });
        }

        const result = await UserService.updateAsync(model);

        if (result) {
            res.status(HttpStatusCode.Ok).send(result);
        } else {
            res.status(HttpStatusCode.NotFound).send({});
        }
    }

    @HttpDelete(router, "/:id")
    public static async deleteAsync(req: Request, res: Response): Promise<void> {
        const result = await UserService.deleteAsync(req.params.id);

        if (result) {
            res.status(HttpStatusCode.NoContent).send(result);
        } else {
            res.status(HttpStatusCode.NotFound).send({});
        }
    }
}
