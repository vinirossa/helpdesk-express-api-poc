/* eslint-disable max-classes-per-file */
import { Request } from "express";
import { Validator } from "fluentvalidation-ts";
import { RuleValidators } from "fluentvalidation-ts/dist/valueValidator/RuleValidators";
import { UserProfile } from "../../utils/enums/user-profile.enum";
import { BaseIdViewModelValidator, BaseViewModelValidator } from "../base.view-model.validator";
import {
    UserChangeActiveViewModel,
    UserChangePasswordViewModel,
    UserConfirmEmailViewModel,
    UserCreateViewModel, UserResetPasswordViewModel, UserUpdateViewModel, UserViewModel,
} from "./user.view-model";

class CommonValidations {
    public static Name<T>(property: RuleValidators<T, string>, locale: Request): void {
        property
            .must((name: any) => typeof name === "string")
            .withMessage(locale.__("%s must be a text", locale.__("Name")))
            .notNull()
            .withMessage(`${locale.__("%s is required", locale.__("Name"))}`)
            .notEmpty()
            .withMessage(`${locale.__("%s can't be empty", locale.__("Name"))}`)
            .minLength(2)
            .withMessage(`${locale.__(
                "%s must have at least %s",
                locale.__("Name"),
                locale.__n("%s characters", 2),
            )}`)
            .must((name) => !name.match(/^.*(?=.*[0-9]).*$/))
            .withMessage(locale.__("%s can't contain numbers", locale.__("Name")))
            .must((name) => !name.match(/^.*(?=.*[!@#$%^&*()\-__+.]).*$/))
            .withMessage(locale.__("%s can't contain special characters", locale.__("Name")));
    }

    public static Email<T>(property: RuleValidators<T, string>, locale: Request): void {
        property
            .must((email: any) => typeof email === "string")
            .withMessage(locale.__("%s must be a text", locale.__("Email")))
            .notNull()
            .withMessage(`${locale.__("%s is required", locale.__("Email"))}`)
            .notEmpty()
            .withMessage(`${locale.__("%s can't be empty", locale.__("Email"))}`)
            .minLength(3)
            .withMessage(`${locale.__(
                "%s must have at least %s",
                locale.__("Email"),
                locale.__n("%s characters", 3),
            )}`)
            .maxLength(320)
            .withMessage(`${locale.__(
                "%s must be less than %s",
                locale.__("Email"),
                locale.__n("%s characters", 320),
            )}`)
            .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
            .withMessage(`${locale.__("%s must be a valid email address", locale.__("Email"))}`);
    }

    public static Profile<T>(property: RuleValidators<T, UserProfile>, locale: Request): void {
        property
            .notNull()
            .withMessage(`${locale.__("%s is required", locale.__("Profile"))}`)
            .must((x) => Object.values(UserProfile).includes(x))
            .withMessage(locale.__("%s is invalid", locale.__("Profile")));
    }

    public static Password<T>(property: RuleValidators<T, string>, locale: Request, key: string = "Password"): void {
        property
            .must((password: any) => typeof password === "string")
            .withMessage(locale.__("%s must be a text", locale.__(key)))
            .notNull()
            .withMessage(`${locale.__("%s is required", locale.__(key))}`)
            .notEmpty()
            .withMessage(`${locale.__("%s can't be empty", locale.__(key))}`)
            .minLength(10)
            .withMessage(`${locale.__(
                "%s must have at least %s",
                locale.__(key),
                locale.__n("%s characters", 10),
            )}`)
            .matches(/^.*(?=(.*[a-z]){1,}).*$/)
            .withMessage(locale.__("%s must contain at least one lowercase letter", locale.__(key)))
            .matches(/^.*(?=(.*[A-Z]){1,}).*$/)
            .withMessage(locale.__("%s must contain at least one uppercase letter", locale.__(key)))
            .matches(/^.*(?=(.*[0-9]){1,}).*$/)
            .withMessage(locale.__("%s must contain at least one number", locale.__(key)))
            .matches(/^.*(?=(.*[!@#$%^&*()\-__+.]){1,}).*$/)
            .withMessage(locale.__("%s must contain at least one special character", locale.__(key)));
    }

    public static Token<T>(property: RuleValidators<T, string>, locale: Request): void {
        property
            .must((token: any) => typeof token === "string")
            .withMessage(locale.__("%s must be a text", locale.__("Token")))
            .notNull()
            .withMessage(`${locale.__("%s is required", locale.__("Token"))}`)
            .notEmpty()
            .withMessage(`${locale.__("%s can't be empty", locale.__("Token"))}`);
    }
}

export class UserViewModelValidator extends BaseViewModelValidator<UserViewModel> {
    constructor(locale: Request) {
        super(locale);

        CommonValidations.Name(this.ruleFor("name"), locale);

        CommonValidations.Email(this.ruleFor("email"), locale);

        CommonValidations.Profile(this.ruleFor("profile"), locale);
    }
}

export class UserCreateViewModelValidator extends Validator<UserCreateViewModel> {
    constructor(private locale: Request) {
        super();

        CommonValidations.Name(this.ruleFor("name"), locale);

        CommonValidations.Email(this.ruleFor("email"), locale);

        CommonValidations.Password(this.ruleFor("password"), locale);

        CommonValidations.Profile(this.ruleFor("profile"), locale);
    }
}

export class UserUpdateViewModelValidator extends BaseIdViewModelValidator<UserUpdateViewModel> {
    constructor(locale: Request) {
        super(locale);

        CommonValidations.Name(this.ruleFor("name"), locale);

        CommonValidations.Profile(this.ruleFor("profile"), locale);
    }
}

export class UserConfirmEmailViewModelValidator extends Validator<UserConfirmEmailViewModel> {
    constructor(private locale: Request) {
        super();

        CommonValidations.Token(this.ruleFor("token"), locale);
    }
}

export class UserChangeActiveViewModelValidator extends BaseIdViewModelValidator<UserChangeActiveViewModel> {
    constructor(locale: Request) {
        super(locale);

        this.ruleFor("active")
            .must((active: any) => typeof active === "boolean")
            .withMessage(locale.__("%s must be a boolean", locale.__("Active")))
            .notNull()
            .withMessage(this.locale.__("%s is required", this.locale.__("Active")));
    }
}

export class UserChangePasswordViewModelValidator extends BaseIdViewModelValidator<UserChangePasswordViewModel> {
    constructor(locale: Request) {
        super(locale);

        this.ruleFor("currentPassword")
            .must((currentPassword: any) => typeof currentPassword === "string")
            .withMessage(locale.__("%s must be a text", locale.__("Current password")))
            .notNull()
            .withMessage(`${locale.__("%s is required", locale.__("Current password"))}`)
            .notEmpty()
            .withMessage(`${locale.__("%s can't be empty", locale.__("Current password"))}`);

        CommonValidations.Password(this.ruleFor("newPassword"), locale, "New password");
    }
}

export class UserResetPasswordViewModelValidator extends Validator<UserResetPasswordViewModel> {
    constructor(private locale: Request) {
        super();

        CommonValidations.Token(this.ruleFor("token"), locale);

        CommonValidations.Password(this.ruleFor("newPassword"), locale, "New password");
    }
}
