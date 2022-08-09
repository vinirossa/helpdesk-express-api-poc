import { FilterOptionsViewModel } from "../view-models/filter-options.view-model";
import { PaginationOptionsViewModel } from "../view-models/pagination-options.view-model";

export class QueryOptionsDto {
    public paginationOptions: PaginationOptionsViewModel;

    public filterOptions: FilterOptionsViewModel;
}
