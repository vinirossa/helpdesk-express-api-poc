import { v4 as uuidv4 } from "uuid";

function isValidUuid(uuid: string): boolean {
    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    return uuid.match(regex) !== null;
}

export class Uuid {
    public static new(): string {
        return uuidv4();
    }

    public static isValid(uuid: string): boolean {
        return isValidUuid(uuid);
    }
}
