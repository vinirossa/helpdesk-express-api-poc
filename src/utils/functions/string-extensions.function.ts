export function isNullOrWhiteSpace(str: string | null): boolean {
    return str === undefined || str === null || str.match(/^ *$/) !== null;
}

export function isString(obj: any): boolean {
    return typeof obj === "string" || obj instanceof String;
}
