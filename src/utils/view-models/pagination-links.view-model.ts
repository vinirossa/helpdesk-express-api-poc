import { QueryOptionsDto } from "../dtos/query-options.dto";
import { Context } from "../types/context";

export class PaginationLinksViewModel {
    public base: string;

    public first: string;

    public prev?: string;

    public next?: string;

    public last: string;

    public static generate(
        context: Context,
        queryOptions: QueryOptionsDto,
        totalPages: number,
    ): PaginationLinksViewModel {
        const controllerUrl = context.req.originalUrl.split("?").shift();

        const lastPage = Math.ceil(totalPages / queryOptions.paginationOptions.size);

        const model: PaginationLinksViewModel = {
            base: `${context.req.protocol}://${context.req.get("host")}`,
            first: `${controllerUrl}?page=1&size=${queryOptions.paginationOptions.size}`,
            prev: queryOptions.paginationOptions.page > 1 && queryOptions.paginationOptions.page <= lastPage
                ? `${controllerUrl}?page=${queryOptions.paginationOptions.page - 1}&size=${queryOptions.paginationOptions.size}`
                : undefined,
            next: queryOptions.paginationOptions.page >= 1 && queryOptions.paginationOptions.page < lastPage
                ? `${controllerUrl}?page=${queryOptions.paginationOptions.page + 1}&size=${queryOptions.paginationOptions.size}`
                : undefined,
            last: `${controllerUrl}?page=${lastPage}&size=${queryOptions.paginationOptions.size}`,
        };

        return model;
    }
}
