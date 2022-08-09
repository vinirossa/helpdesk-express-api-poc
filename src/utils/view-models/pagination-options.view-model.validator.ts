import { Request } from "express";
import { Validator } from "fluentvalidation-ts";
import { PaginationOptionsViewModel } from "./pagination-options.view-model";

export class PaginationOptionsViewModelValidator extends Validator<PaginationOptionsViewModel> {
    constructor(private locale: Request<any, any, any, any>) {
        super();

        this.ruleFor("page")
            .must((page: any) => typeof page === "number" && !Number.isNaN(page))
            .withMessage(this.locale.__("%s must be an integer number", this.locale.__("Page")))
            .must((page) => page > 0)
            .withMessage(this.locale.__("%s must be greater than 0", this.locale.__("Page")));

        this.ruleFor("size")
            .must((size: any) => typeof size === "number" && !Number.isNaN(size))
            .withMessage(this.locale.__("%s must be an integer number", this.locale.__("Size")))
            .must((size) => size > 0)
            .withMessage(this.locale.__("%s must be greater than 0", this.locale.__("Size")));
    }
}
