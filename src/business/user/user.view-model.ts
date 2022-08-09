/* eslint-disable max-classes-per-file */
import { AutoMap } from "@automapper/classes";
import { UserProfile } from "../../utils/enums/user-profile.enum";
import { BaseIdViewModel, BaseViewModel } from "../base.view-model";

export class UserViewModel implements BaseViewModel {
    @AutoMap()
    public id: string;

    @AutoMap()
    public active: boolean;

    @AutoMap()
    public createdAt: Date;

    @AutoMap()
    public createdBy: string | null;

    @AutoMap()
    public name: string;

    @AutoMap()
    public email: string;

    @AutoMap()
    public profile: UserProfile;
}

export class UserLoginViewModel {
    constructor(obj: UserLoginViewModel) {
        this.email = obj.email;
        this.password = obj.password;
    }

    public email: string;

    public password: string;
}

export class UserCreateViewModel {
    constructor(obj: UserCreateViewModel) {
        this.name = obj.name;
        this.email = obj.email;
        this.profile = obj.profile;
        this.password = obj.password;
    }

    @AutoMap()
    public name: string;

    @AutoMap()
    public email: string;

    @AutoMap()
    public profile: UserProfile;

    @AutoMap()
    public password: string;
}

export class UserUpdateViewModel {
    constructor(obj: UserUpdateViewModel) {
        this.id = obj.id;
        this.name = obj.name;
        this.profile = obj.profile;
    }

    @AutoMap()
    public id: string;

    @AutoMap()
    public name: string;

    @AutoMap()
    public profile: UserProfile;
}

export class UserConfirmEmailViewModel {
    constructor(obj: UserConfirmEmailViewModel) {
        this.token = obj.token;
    }

    public token: string;
}

export class UserChangeActiveViewModel {
    constructor(obj: UserChangeActiveViewModel) {
        this.id = obj.id;
        this.active = obj.active;
    }

    @AutoMap()
    public id: string;

    @AutoMap()
    public active: boolean;
}

export class UserChangePasswordViewModel implements BaseIdViewModel {
    constructor(obj: UserChangePasswordViewModel) {
        this.id = obj.id;
        this.currentPassword = obj.currentPassword;
        this.newPassword = obj.newPassword;
    }

    @AutoMap()
    public id: string;

    public currentPassword: string;

    @AutoMap()
    public newPassword: string;
}

export class UserResetPasswordViewModel {
    constructor(obj: UserResetPasswordViewModel) {
        this.token = obj.token;
        this.newPassword = obj.newPassword;
    }

    public token: string;

    public newPassword: string;
}
