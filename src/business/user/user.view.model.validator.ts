import { BaseViewModelValidator } from "../base.view.model.validator";
import { UserViewModel } from "./user.view.model";

export class UserViewModelValidator extends BaseViewModelValidator<UserViewModel> {
    constructor() {
        super();

        this.ruleFor("name")
            .notNull()
            .withMessage("Name is required")
            .notEmpty()
            .withMessage("Name can't be empty");

        this.ruleFor("email")
            .notNull()
            .withMessage("Email is required")
            .notEmpty()
            .withMessage("Email can't be empty");

        this.ruleFor("password")
            .notNull()
            .withMessage("Password is required")
            .notEmpty()
            .withMessage("Password can't be empty");

        this.ruleFor("profile")
            .notNull()
            .withMessage("Profile is required");
    }
}
