import { Uuid } from "../../utils/classes/uuid.class";
import { mapper } from "../../utils/mappings/mapper";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import { UserViewModel } from "./user.view.model";

export class UserService {
    constructor(private repository: UserRepository) { }

    public static async getAllAsync(): Promise<UserViewModel[]> {
        const entities = await UserRepository.getAllAsync();
        const models = entities.map((x) => mapper.map(x, User, UserViewModel));

        return models;
    }

    public static async getAsync(id: string): Promise<UserViewModel> {
        const entity = await UserRepository.getAsync(id);

        return mapper.map(entity, User, UserViewModel);
    }

    public static async insertAsync(model: UserViewModel): Promise<UserViewModel> {
        const entity = mapper.map(model, UserViewModel, User);
        entity.id = Uuid.new();
        entity.active = true;
        entity.createdAt = new Date();

        await UserRepository.insertAsync(entity);

        return mapper.map(entity, User, UserViewModel);
    }

    public static async updateAsync(model: UserViewModel): Promise<UserViewModel> {
        const entity = mapper.map(model, UserViewModel, User);

        const result = await UserRepository.updateAsync(entity);
        if (!result) { return result; }

        return mapper.map(entity, User, UserViewModel);
    }

    public static async deleteAsync(id: string): Promise<boolean> {
        const result = await UserRepository.deleteAsync(id);
        return result;
    }
}
