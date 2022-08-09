import pgdb from "../../db/postgres";
import { QueryOptionsDto } from "../../utils/dtos/query-options.dto";
import { User } from "./user.model";

export class UserRepository {
    public static async getAllAsync(queryOptions: QueryOptionsDto): Promise<[User[], number]> {
        return pgdb.manager.findAndCount(User, {
            order: { name: "DESC" },
            take: queryOptions.paginationOptions.size,
            skip: queryOptions.paginationOptions.size * (queryOptions.paginationOptions.page - 1),
        });
    }

    public static async getByIdAsync(id: string): Promise<User | null> {
        return pgdb.manager.findOne(User, { where: { id } });
    }

    public static async getByEmailAsync(email: string): Promise<User | null> {
        return pgdb.manager.findOne(User, { where: { email } });
    }

    public static async createAsync(entity: User): Promise<User> {
        return pgdb.manager.save(User, entity);
    }

    public static async updateAsync(entity: User): Promise<User | null> {
        const currentEntity = await UserRepository.getByIdAsync(entity.id);
        if (!currentEntity) { return null; }

        const updatedEntity = await pgdb.manager.save(User, entity);
        updatedEntity.createdAt = currentEntity.createdAt;
        updatedEntity.createdBy = currentEntity.createdBy;

        return { ...currentEntity, ...updatedEntity };
    }

    public static async deleteAsync(id: string): Promise<boolean> {
        const currentEntity = await UserRepository.getByIdAsync(id);
        if (!currentEntity) { return false; }

        await pgdb.manager.remove(User, currentEntity);

        return true;
    }
}
