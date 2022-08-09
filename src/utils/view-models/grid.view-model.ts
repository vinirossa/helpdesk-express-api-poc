import { PaginationLinksViewModel } from "./pagination-links.view-model";

export class GridViewModel<T> {
    public total: number;

    public count: number;

    public page: number;

    public size: number;

    public links: PaginationLinksViewModel;

    public results: T[];
}
