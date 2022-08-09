export class PaginationOptionsViewModel {
    constructor(obj: PaginationOptionsViewModel) {
        this.page = obj.page ? parseInt(obj.page as unknown as string) : 1;
        this.size = obj.size ? parseInt(obj.size as unknown as string) : 10;
    }

    public page: number;

    public size: number;
}
