import { db } from "../../db/database";
import { User } from "./user.model";

export const BASE_TABLE = "users";

export class UserRepository {
    public static async getAllAsync(): Promise<User[]> {
        return db
            .select("*")
            .from(BASE_TABLE);
    }

    public static async getAsync(id: string): Promise<User> {
        return db()
            .select("*")
            .where({ id })
            .first()
            .from(BASE_TABLE);
    }

    public static async insertAsync(entity: User): Promise<void> {
        await db
            .insert(entity)
            .into(BASE_TABLE);
    }

    public static async updateAsync(entity: User): Promise<User> {
        const found = await UserRepository.getAsync(entity.id);
        if (!found) { return null as unknown as User; }

        return db
            .update(entity)
            .where({ id: entity.id })
            .from(BASE_TABLE);
    }

    public static async deleteAsync(id: string): Promise<boolean> {
        const found = await UserRepository.getAsync(id);
        if (!found) { return false; }

        await db
            .delete()
            .where({ id })
            .from(BASE_TABLE);

        return true;
    }
}
