/* eslint-disable max-classes-per-file */
import { Request } from "express";
import { Validator } from "fluentvalidation-ts";
import { Uuid } from "../utils/classes/uuid.class";
import { BaseIdViewModel, BaseViewModel } from "./base.view-model";

export class BaseIdViewModelValidator<T extends BaseIdViewModel> extends Validator<T> {
    constructor(protected locale: Request) {
        super();

        this.ruleFor("id")
            .must((id: any) => typeof id === "string")
            .withMessage(locale.__("%s must be a text", locale.__("Id")))
            .must((id) => Uuid.isValid(id!))
            .withMessage(this.locale.__("Id must be a valid UUID"))
            .when((x) => x.id !== undefined);
    }
}

export class BaseViewModelValidator<T extends BaseViewModel> extends BaseIdViewModelValidator<T> {
    constructor(locale: Request) {
        super(locale);

        this.ruleFor("active")
            .must((active: any) => typeof active === "boolean")
            .withMessage(locale.__("%s must be a boolean", locale.__("Active")))
            .notNull()
            .withMessage(this.locale.__("%s is required", this.locale.__("Active")));
    }
}
