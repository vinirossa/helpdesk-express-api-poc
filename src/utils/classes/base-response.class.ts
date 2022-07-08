import { HttpStatusCode } from "../enums/htttp-status-code.enum";

export class BaseResponse {
    constructor(
        public type: string,
        public title: string,
        public status: HttpStatusCode,
        public detail?: string | object,
        public instance?: string,
    ) {}
}
