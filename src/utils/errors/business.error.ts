export class BusinessError extends Error {
    constructor(public message: string, public details?: string | object) {
        super(message);
        Object.setPrototypeOf(this, BusinessError.prototype);
    }
}
