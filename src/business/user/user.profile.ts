import {
    createMap, forMember, mapFrom, Mapper, MappingProfile,
} from "@automapper/core";
import { User } from "./user.model";
import {
    UserChangeActiveViewModel,
    UserCreateViewModel,
    UserUpdateViewModel,
    UserViewModel,
} from "./user.view-model";

export class UserProfile {
    public static profile(): MappingProfile {
        return (mapper: Mapper) => {
            createMap(mapper, User, UserViewModel);

            createMap(
                mapper,
                UserCreateViewModel,
                User,
                forMember(
                    (d) => d.name,
                    mapFrom((source) => source.name.trim()),
                ),
                forMember(
                    (d) => d.email,
                    mapFrom((source) => source.email.trim().toLowerCase()),
                ),
            );

            createMap(
                mapper,
                UserUpdateViewModel,
                User,
                forMember(
                    (d) => d.name,
                    mapFrom((source) => source.name.trim()),
                ),
            );

            createMap(mapper, UserChangeActiveViewModel, User);
        };
    }
}
