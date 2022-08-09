import { Request } from "express";
import { BaseIdViewModelValidator } from "../../base.view-model.validator";
import { ResetTokenDto } from "./reset-token.dto";

export class ResetTokenDtoValidator extends BaseIdViewModelValidator<ResetTokenDto> {
    constructor(locale: Request) {
        super(locale);

        this.ruleFor("exp")
            .notNull()
            .withMessage(`${locale.__("%s is required", locale.__("Token expiration date"))}`);
    }
}
