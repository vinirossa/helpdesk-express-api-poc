import { AutoMap } from "@automapper/classes";
import { UserProfile } from "../../utils/enums/user-profile.enum";
import { BaseViewModel } from "../base.view.model";

export class UserViewModel implements BaseViewModel {
    @AutoMap()
    public id?: string;

    @AutoMap()
    public active?: boolean;

    @AutoMap()
    public name: string;

    @AutoMap()
    public email: string;

    @AutoMap()
    public password: string;

    @AutoMap()
    public profile: UserProfile;
}
