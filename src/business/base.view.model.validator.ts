import { Validator } from "fluentvalidation-ts";
import { Uuid } from "../utils/classes/uuid.class";
import { BaseViewModel } from "./base.view.model";

export class BaseViewModelValidator<T extends BaseViewModel> extends Validator<T> {
    constructor() {
        super();

        this.ruleFor("id")
            .must((id) => Uuid.isValid(id!))
            .withMessage("Id must be a valid UUID")
            .when((x) => x.id !== undefined);

        this.ruleFor("active");
    }
}
