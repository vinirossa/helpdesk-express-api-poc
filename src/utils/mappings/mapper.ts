/* eslint-disable import/first */
import { addProfile, createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { UserProfile } from "../../business/user/user.profile";

// Create and export the mapper
export const mapper = createMapper({
    strategyInitializer: classes(),
});

addProfile(mapper, UserProfile.profile());
