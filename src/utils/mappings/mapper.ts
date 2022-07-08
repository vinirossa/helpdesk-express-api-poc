/* eslint-disable import/first */
import { createMap, createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { User } from "../../business/user/user.model";
import { UserViewModel } from "../../business/user/user.view.model";

// Create and export the mapper
export const mapper = createMapper({
    strategyInitializer: classes(),
});

createMap(mapper, UserViewModel, User);
createMap(mapper, User, UserViewModel);
