export class FilterOptionsViewModel {
    constructor(obj: FilterOptionsViewModel) {
        this.order = obj.order;
        this.filter = obj.filter;
    }

    public order?: string;

    public filter?: string;
}
