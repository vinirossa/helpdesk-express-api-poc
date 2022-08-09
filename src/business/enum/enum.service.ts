import { UserProfile } from "../../utils/enums/user-profile.enum";
import { Context } from "../../utils/types/context";
import { EnumViewModel } from "./enum.view-model";

export class EnumService {
    public static getByName(context: Context, enumName: string): EnumViewModel[] | null {
        switch (enumName) {
            case "UserProfile":
                return EnumService.mapEnumToViewModel(context, UserProfile);

            default:
                return null;
        }
    }

    private static mapEnumToViewModel(context: Context, enumObj: Object): EnumViewModel[] {
        return Object.keys(enumObj)
            .filter((key) => Number.isNaN(parseInt(key)))
            .map((key) => new EnumViewModel(context.req.__(key), enumObj[key]));
    }
}
