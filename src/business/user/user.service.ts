import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { QueryOptionsDto } from "../../utils/dtos/query-options.dto";
import { BusinessError } from "../../utils/errors/business.error";
import { isEmptyObject } from "../../utils/functions/object-extensions.function";
import { isNullOrWhiteSpace, isString } from "../../utils/functions/string-extensions.function";
import { DateTimeHelper } from "../../utils/helpers/date-time.helper";
import { EmailSenderHelper } from "../../utils/helpers/email-sender.helper";
import { mapper } from "../../utils/mappings/mapper";
import { Context } from "../../utils/types/context";
import { GridViewModel } from "../../utils/view-models/grid.view-model";
import { PaginationLinksViewModel } from "../../utils/view-models/pagination-links.view-model";
import { UserPasswordHistory } from "../user-password-history/user-password-history.model";
import { ConfirmationTokenDto } from "./dtos/confirmation-token.dto";
import { ConfirmationTokenDtoValidator } from "./dtos/confirmation-token.dto.validator";
import { ResetTokenDto } from "./dtos/reset-token.dto";
import { ResetTokenDtoValidator } from "./dtos/reset-token.dto.validator";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import {
    UserChangeActiveViewModel,
    UserChangePasswordViewModel,
    UserConfirmEmailViewModel,
    UserCreateViewModel,
    UserResetPasswordViewModel,
    UserUpdateViewModel,
    UserViewModel,
} from "./user.view-model";

export class UserService {
    private static readonly HASH_SALT_ROUNDS = 12;

    public static async getAllAsync(context: Context, queryOptions: QueryOptionsDto): Promise<GridViewModel<UserViewModel>> {
        const [entities, total] = await UserRepository.getAllAsync(queryOptions);
        const models = entities.map((x) => mapper.map(x, User, UserViewModel));

        const links = PaginationLinksViewModel.generate(context, queryOptions, total);

        const gridModel: GridViewModel<UserViewModel> = {
            total,
            count: models.length,
            page: queryOptions.paginationOptions.page,
            size: queryOptions.paginationOptions.size,
            links,
            results: models,
        };

        return gridModel;
    }

    public static async getByIdAsync(context: Context, id: string): Promise<UserViewModel | null> {
        const entity = await UserRepository.getByIdAsync(id);
        if (!entity) { return null; }

        const model = mapper.map(entity, User, UserViewModel);

        return model;
    }

    public static async createAsync(context: Context, model: UserCreateViewModel): Promise<UserViewModel> {
        // Check if email is already registered
        const emailAlreadyRegistered = await UserService.checkEmail(context, model.email);

        if (emailAlreadyRegistered) {
            throw new BusinessError(context.req.__("Email already registered"));
        }

        // Map model to entity
        const entity = mapper.map(model, UserCreateViewModel, User);

        // Hash password
        entity.password = await bcrypt.hash(entity.password, UserService.HASH_SALT_ROUNDS);

        // Create user to database
        const createdEntity = await UserRepository.createAsync(entity);

        // Send confirmation email
        await UserService.sendConfirmationEmail(context, createdEntity.id);

        // Map entity to model
        const createdModel = mapper.map(createdEntity, User, UserViewModel);

        return createdModel;
    }

    public static async updateAsync(context: Context, model: UserUpdateViewModel): Promise<UserViewModel | null> {
        const entity = mapper.map(model, UserUpdateViewModel, User);

        const updatedEntity = await UserRepository.updateAsync(entity);
        const updatedModel = mapper.map(updatedEntity, User, UserViewModel);

        return updatedModel;
    }

    public static async changeActive(context: Context, model: UserChangeActiveViewModel): Promise<UserViewModel | null> {
        const entity = mapper.map(model, UserChangeActiveViewModel, User);

        const updatedEntity = await UserRepository.updateAsync(entity);
        const updatedModel = mapper.map(updatedEntity, User, UserViewModel);

        return updatedModel;
    }

    public static async deleteAsync(context: Context, id: string): Promise<boolean> {
        const result = await UserRepository.deleteAsync(id);

        return result;
    }

    public static async checkEmail(context: Context, email: string): Promise<boolean> {
        if (!email) {
            return false;
        }

        const entity = await UserRepository.getByEmailAsync(email);

        return Boolean(entity);
    }

    public static async sendConfirmationEmail(context: Context, id: string): Promise<boolean> {
        // Check if user exists
        const currentEntity = await UserRepository.getByIdAsync(id);
        if (!currentEntity) { return false; }

        // Check if user's email is already confirmed
        if (currentEntity.emailConfirmed) {
            throw new BusinessError(context.req.__("Email is already confirmed"));
        }

        // Check if user has already requested a confirmation email in the last 5 minutes
        if (!isNullOrWhiteSpace(currentEntity.confirmationToken)) {
            const decodedToken = jwt.verify(currentEntity.confirmationToken!, process.env.JWT_CONFIRMATION_SECRET!);

            const payload = decodedToken as jwt.JwtPayload & ConfirmationTokenDto;

            if (DateTimeHelper.nowUnix() < payload.iat! + 300) {
                throw new BusinessError(
                    context.req.__(
                        "Wait at least %s minutes before requesting a new %s email",
                        context.req.__n("%s minutes", 5),
                        context.req.__("confirmation"),
                    ),
                );
            }
        }

        // Generate confirmation token
        const payload: ConfirmationTokenDto = {
            id: currentEntity.id,
        };

        const confirmationToken = jwt.sign(payload, process.env.JWT_CONFIRMATION_SECRET!);

        // Send confirmation email with token
        await EmailSenderHelper.sendAsync(
            currentEntity.email,
            "Confirm your account",
            `${currentEntity.name}, please confirm your e-mail with this token ${confirmationToken}`,
        );

        return true;
    }

    public static async confirmEmail(context: Context, model: UserConfirmEmailViewModel): Promise<boolean> {
        // Decode token
        let temp: string | jwt.JwtPayload;
        try {
            temp = jwt.verify(model.token, process.env.JWT_CONFIRMATION_SECRET!);
        } catch (err) {
            throw new BusinessError(context.req.__("Invalid token"), err as Error);
        }
        const decodedToken = temp;
        temp = "";

        // Check if token is valid
        if (isString(decodedToken)) {
            throw new BusinessError(context.req.__("Invalid token"));
        }

        const payload = decodedToken as jwt.JwtPayload & ConfirmationTokenDto;

        const validator = new ConfirmationTokenDtoValidator(context.req);
        const errors = validator.validate(payload);
        if (isEmptyObject(errors)) {
            throw new BusinessError(context.req.__("Invalid token payload"), errors);
        }

        // Get user by payload's id
        const currentEntity = await UserRepository.getByIdAsync(payload.id);
        if (!currentEntity) { return false; }

        // Check if user's email is already confirmed
        if (currentEntity.emailConfirmed) {
            throw new BusinessError(context.req.__("Email is already confirmed"));
        }

        // Reset user's password and remove reset token
        currentEntity.emailConfirmed = true;

        const updatedEntity = await UserRepository.updateAsync(currentEntity);
        if (!updatedEntity) { return false; }

        return true;
    }

    public static async changePassword(context: Context, model: UserChangePasswordViewModel): Promise<boolean> {
        // Check if passwords are the same
        if (model.currentPassword === model.newPassword) {
            throw new BusinessError(context.req.__("New password must be different from the current password"));
        }

        // Check if user exists
        const currentEntity = await UserRepository.getByIdAsync(model.id);
        if (!currentEntity) { return false; }

        // Check if current password is correct
        const isPasswordCorrect = await bcrypt.compare(model.currentPassword, currentEntity.password);
        if (!isPasswordCorrect) {
            throw new BusinessError(context.req.__("Current password is incorrect"));
        }

        // Check if new password is different from previous ones
        if (currentEntity.userPasswordHistory) {
            for (const history of currentEntity.userPasswordHistory) {
                // eslint-disable-next-line no-await-in-loop
                const isPasswordEqual = await bcrypt.compare(model.newPassword, history.password);
                if (isPasswordEqual) {
                    throw new BusinessError(context.req.__("New password must be different from the previous ones"));
                }
            }
        }

        // Save old password in password history
        if (currentEntity.userPasswordHistory) {
            currentEntity.userPasswordHistory.push(new UserPasswordHistory(currentEntity.password, currentEntity));
        } else {
            currentEntity.userPasswordHistory = [new UserPasswordHistory(currentEntity.password, currentEntity)];
        }

        // Hash new password
        currentEntity.password = await bcrypt.hash(model.newPassword, UserService.HASH_SALT_ROUNDS);

        // Update user
        const updatedEntity = await UserRepository.updateAsync(currentEntity);
        if (!updatedEntity) { return false; }

        return true;
    }

    public static async forgotPassword(context: Context, email: string): Promise<boolean> {
        if (!email) {
            return false;
        }

        // Get user by email
        const currentEntity = await UserRepository.getByEmailAsync(email);
        if (!currentEntity) { return false; }

        // Check if user has already requested a reset password email in the last 10 minutes
        if (!isNullOrWhiteSpace(currentEntity.resetToken)) {
            const decodedToken = jwt.verify(currentEntity.resetToken!, process.env.JWT_RESET_SECRET!);

            const payload = decodedToken as jwt.JwtPayload & ConfirmationTokenDto;

            if (DateTimeHelper.nowUnix() < payload.iat! + 600) {
                throw new BusinessError(
                    context.req.__(
                        "Wait at least %s minutes before requesting a new %s email",
                        context.req.__n("%s minutes", 10),
                        context.req.__("password reset"),
                    ),
                );
            }
        }

        // Check if user's password has been reset in the last 24 hours
        if (currentEntity.lastPasswordReset) {
            if (DateTimeHelper.now() < DateTimeHelper.datePlusHoursUnix(currentEntity.lastPasswordReset, 24)) {
                throw new BusinessError(
                    // You can only reset your password once every 24 hours. Please try again later.
                    context.req.__("Please wait at least 24 hours to reset your password again"),
                );
            }
        }

        // Generate reset token
        const payload: ResetTokenDto = {
            id: currentEntity.id,
            exp: DateTimeHelper.nowPlusHoursUnix(1),
        };

        const resetToken = jwt.sign(payload, process.env.JWT_RESET_SECRET!);
        currentEntity.resetToken = resetToken;

        // Send email with reset token
        await EmailSenderHelper.sendAsync(
            currentEntity.email,
            "Reset your password",
            `${currentEntity.name}, your password reset token is ${currentEntity.resetToken}`,
        );

        // Save reset token to database

        const updatedEntity = await UserRepository.updateAsync(currentEntity);
        if (!updatedEntity) { return false; }

        return true;
    }

    public static async resetPassword(context: Context, model: UserResetPasswordViewModel): Promise<boolean> {
        // Decode reset token
        let temp: string | jwt.JwtPayload;
        try {
            temp = jwt.verify(model.token, process.env.JWT_RESET_SECRET!);
        } catch (err) {
            throw new BusinessError(context.req.__("Invalid token"), err as Error);
        }
        const decodedToken = temp;
        temp = "";

        // Check if token is valid
        if (isString(decodedToken)) {
            throw new BusinessError(context.req.__("Invalid token"));
        }

        const payload = decodedToken as jwt.JwtPayload & ResetTokenDto;

        const validator = new ResetTokenDtoValidator(context.req);
        const errors = validator.validate(payload);
        if (isEmptyObject(errors)) {
            throw new BusinessError(context.req.__("Invalid token payload"), errors);
        }

        // Check if token is expired
        if (DateTimeHelper.nowUnix() > payload.exp) {
            throw new BusinessError(context.req.__("Token expired"));
        }

        // Get user by payload's id
        const currentEntity = await UserRepository.getByIdAsync(payload.id);
        if (!currentEntity) { return false; }

        // Compares user's reset token with the one provided
        if (model.token !== currentEntity.resetToken) {
            throw new BusinessError(context.req.__("Invalid token"));
        }

        // Check if passwords are the same
        const isPasswordEqualToCurrent = await bcrypt.compare(model.newPassword, currentEntity.password);
        if (isPasswordEqualToCurrent) {
            throw new BusinessError(context.req.__("New password must be different from the current password"));
        }

        // Check if new password is different from previous ones
        if (currentEntity.userPasswordHistory) {
            for (const history of currentEntity.userPasswordHistory) {
                // eslint-disable-next-line no-await-in-loop
                const isPasswordEqual = await bcrypt.compare(model.newPassword, history.password);
                if (isPasswordEqual) {
                    throw new BusinessError(context.req.__("New password must be different from the previous ones"));
                }
            }
        }

        // Save old password in password history
        if (currentEntity.userPasswordHistory) {
            currentEntity.userPasswordHistory.push(new UserPasswordHistory(currentEntity.password, currentEntity));
        } else {
            currentEntity.userPasswordHistory = [new UserPasswordHistory(currentEntity.password, currentEntity)];
        }

        // Reset user's password and remove reset token
        currentEntity.password = await bcrypt.hash(model.newPassword, UserService.HASH_SALT_ROUNDS);
        currentEntity.resetToken = null;
        currentEntity.lastPasswordReset = DateTimeHelper.now();

        // Update user
        const updatedEntity = await UserRepository.updateAsync(currentEntity);
        if (!updatedEntity) { return false; }

        return true;
    }
}
