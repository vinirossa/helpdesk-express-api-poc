import { Request } from "express";
import { BaseIdViewModelValidator } from "../../base.view-model.validator";
import { AuthTokenDto } from "./auth-token.dto";

export class AuthTokenDtoValidator extends BaseIdViewModelValidator<AuthTokenDto> {
    constructor(locale: Request) {
        super(locale);

        this.ruleFor("exp")
            .notNull()
            .withMessage(`${locale.__("%s is required", locale.__("Token expiration date"))}`);
    }
}
