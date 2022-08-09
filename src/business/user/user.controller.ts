import express, { Request, Response } from "express";
import {
    HttpGet, HttpHead, HttpPatch, HttpPost, HttpPut,
} from "../../utils/decorators/http-method.decorator";
import { QueryOptionsDto } from "../../utils/dtos/query-options.dto";
import { HttpStatusCode } from "../../utils/enums/htttp-status-code.enum";
import { BusinessError } from "../../utils/errors/business.error";
import { isEmptyObject } from "../../utils/functions/object-extensions.function";
import { Context } from "../../utils/types/context";
import { FilterOptionsViewModel } from "../../utils/view-models/filter-options.view-model";
import { PaginationOptionsViewModel } from "../../utils/view-models/pagination-options.view-model";
import { PaginationOptionsViewModelValidator } from "../../utils/view-models/pagination-options.view-model.validator";
import { UserService } from "./user.service";
import {
    UserChangeActiveViewModel,
    UserChangePasswordViewModel,
    UserConfirmEmailViewModel,
    UserCreateViewModel,
    UserLoginViewModel,
    UserResetPasswordViewModel,
    UserUpdateViewModel,
} from "./user.view-model";
import {
    UserChangeActiveViewModelValidator,
    UserChangePasswordViewModelValidator,
    UserConfirmEmailViewModelValidator,
    UserCreateViewModelValidator,
    UserResetPasswordViewModelValidator,
    UserUpdateViewModelValidator,
} from "./user.view-model.validator";

export const router = express.Router();
export const BASE_URL = "/users";

export class UserController {
    // @HttpPost(router, "/login")
    // public static async login(req: Request<any, any, UserLoginViewModel, any>, res: Response): Promise<void> {
    //     const context: Context = { req, res };

    //     const model = new UserLoginViewModel(req.body);

    //     const validator = new UserResetPasswordViewModelValidator(req);
    //     const errors = validator.validate(model);
    //     if (isEmptyObject(errors)) {
    //         throw new BusinessError(req.__("Invalid model"), errors);
    //     }

    //     const result = await UserService.resetPassword(context, model);

    //     if (result) {
    //         res.status(HttpStatusCode.Ok).send();
    //     } else {
    //         res.status(HttpStatusCode.NotFound).send();
    //     }
    // }

    // @HttpPost(router, "/logout")
    // public static async logout(req: Request<any, any, any, any>, res: Response): Promise<void> {
    //     const context: Context = { req, res };

    //     const result = await UserService.resetPassword(context);

    //     if (result) {
    //         res.status(HttpStatusCode.Ok).send();
    //     } else {
    //         res.status(HttpStatusCode.NotFound).send();
    //     }
    // }

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get all users
     *     description: Get all users from database. Can be filtered.
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: username
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Returns a mysterious string.
     */
    @HttpGet(router)
    public static async getAllAsync(
        req: Request<any, any, FilterOptionsViewModel, PaginationOptionsViewModel>,
        res: Response,
    ): Promise<void> {
        const context: Context = { req, res };

        const paginationOptions = new PaginationOptionsViewModel(req.query);
        const filterOptions = new FilterOptionsViewModel(req.body);

        const validator = new PaginationOptionsViewModelValidator(req);
        const errors = validator.validate(paginationOptions);
        if (isEmptyObject(errors)) {
            throw new BusinessError(req.__("Invalid model"), errors);
        }

        const queryOptions: QueryOptionsDto = { paginationOptions, filterOptions };

        const models = await UserService.getAllAsync(context, queryOptions);

        res.status(HttpStatusCode.Ok).send(models);
    }

    @HttpGet(router, "/:id")
    public static async getByIdAsync(req: Request, res: Response): Promise<void> {
        const context: Context = { req, res };

        const model = await UserService.getByIdAsync(context, req.params.id);

        if (model) {
            res.status(HttpStatusCode.Ok).send(model);
        } else {
            res.status(HttpStatusCode.NotFound).send();
        }
    }

    @HttpPost(router)
    public static async createAsync(req: Request<any, any, UserCreateViewModel, any>, res: Response): Promise<void> {
        const context: Context = { req, res };

        const model = new UserCreateViewModel(req.body);

        const validator = new UserCreateViewModelValidator(req);
        const errors = validator.validate(model);
        if (isEmptyObject(errors)) {
            throw new BusinessError(req.__("Invalid model"), errors);
        }

        const createdModel = await UserService.createAsync(context, model);
        res.status(HttpStatusCode.Created).send(createdModel);
    }

    @HttpPut(router)
    public static async updateAsync(req: Request<any, any, UserUpdateViewModel, any>, res: Response): Promise<void> {
        const context: Context = { req, res };

        const model = new UserUpdateViewModel(req.body);

        const validator = new UserUpdateViewModelValidator(req);
        const errors = validator.validate(model);
        if (isEmptyObject(errors)) {
            throw new BusinessError(req.__("Invalid model"), errors);
        }

        const updatedModel = await UserService.updateAsync(context, model);

        if (updatedModel) {
            res.status(HttpStatusCode.Ok).send(updatedModel);
        } else {
            res.status(HttpStatusCode.NotFound).send();
        }
    }

    // @HttpDelete(router, "/:id")
    public static async deleteAsync(req: Request, res: Response): Promise<void> {
        const context: Context = { req, res };

        const result = await UserService.deleteAsync(context, req.params.id);

        if (result) {
            res.status(HttpStatusCode.NoContent).send();
        } else {
            res.status(HttpStatusCode.NotFound).send();
        }
    }

    @HttpPost(router, "/confirmation-email/:id")
    public static async sendConfirmationEmail(req: Request, res: Response): Promise<void> {
        const context: Context = { req, res };

        const result = await UserService.sendConfirmationEmail(context, req.params.id);

        if (result) {
            res.status(HttpStatusCode.Ok).send();
        } else {
            res.status(HttpStatusCode.NotFound).send();
        }
    }

    @HttpPost(router, "/confirm-email")
    public static async confirmEmail(req: Request<any, any, UserConfirmEmailViewModel, any>, res: Response): Promise<void> {
        const context: Context = { req, res };

        const model = new UserConfirmEmailViewModel(req.body);

        const validator = new UserConfirmEmailViewModelValidator(req);
        const errors = validator.validate(model);
        if (isEmptyObject(errors)) {
            throw new BusinessError(req.__("Invalid model"), errors);
        }

        const result = await UserService.confirmEmail(context, model);

        if (result) {
            res.status(HttpStatusCode.Ok).send();
        } else {
            res.status(HttpStatusCode.NotFound).send();
        }
    }

    @HttpPatch(router, "/active")
    public static async changeActive(req: Request<any, any, UserChangeActiveViewModel, any>, res: Response): Promise<void> {
        const context: Context = { req, res };

        const model = new UserChangeActiveViewModel(req.body);

        const validator = new UserChangeActiveViewModelValidator(req);
        const errors = validator.validate(model);
        if (isEmptyObject(errors)) {
            throw new BusinessError(req.__("Invalid model"), errors);
        }

        const updatedModel = await UserService.changeActive(context, model);

        if (updatedModel) {
            res.status(HttpStatusCode.Ok).send(updatedModel);
        } else {
            res.status(HttpStatusCode.NotFound).send();
        }
    }

    @HttpHead(router, "/email/:email")
    public static async checkEmail(req: Request, res: Response): Promise<void> {
        const context: Context = { req, res };

        const result = await UserService.checkEmail(context, req.params.email);

        if (result) {
            res.status(HttpStatusCode.Ok).send();
        } else {
            res.status(HttpStatusCode.NotFound).send();
        }
    }

    @HttpPost(router, "/change-password")
    public static async changePassword(req: Request<any, any, UserChangePasswordViewModel, any>, res: Response): Promise<void> {
        const context: Context = { req, res };

        const model = new UserChangePasswordViewModel(req.body);

        const validator = new UserChangePasswordViewModelValidator(req);
        const errors = validator.validate(model);
        if (isEmptyObject(errors)) {
            throw new BusinessError(req.__("Invalid model"), errors);
        }

        const result = await UserService.changePassword(context, model);

        if (result) {
            res.status(HttpStatusCode.Ok).send();
        } else {
            res.status(HttpStatusCode.NotFound).send();
        }
    }

    @HttpPost(router, "/forgot-password/:email")
    public static async forgotPassword(req: Request, res: Response): Promise<void> {
        const context: Context = { req, res };

        const result = await UserService.forgotPassword(context, req.params.email);

        if (result) {
            res.status(HttpStatusCode.Ok).send();
        } else {
            res.status(HttpStatusCode.NotFound).send();
        }
    }

    @HttpPost(router, "/reset-password")
    public static async resetPassword(req: Request<any, any, UserResetPasswordViewModel, any>, res: Response): Promise<void> {
        const context: Context = { req, res };

        const model = new UserResetPasswordViewModel(req.body);

        const validator = new UserResetPasswordViewModelValidator(req);
        const errors = validator.validate(model);
        if (isEmptyObject(errors)) {
            throw new BusinessError(req.__("Invalid model"), errors);
        }

        const result = await UserService.resetPassword(context, model);

        if (result) {
            res.status(HttpStatusCode.Ok).send();
        } else {
            res.status(HttpStatusCode.NotFound).send();
        }
    }
}
