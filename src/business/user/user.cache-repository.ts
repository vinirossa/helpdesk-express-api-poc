import redis from "../../cache/redis";
import { UserCache } from "./user.cache-model";

export class UserCacheRepository {
    public static async getAllAsync(): Promise<UserCache[]> {
        return null;
    }

    public static async getByIdAsync(id: string): Promise<UserCache | null> {
    }

    public static async createAsync(entity: UserCache): Promise<UserCache> {
        await redis.json.set("users", "$", entity);
    }

    public static async updateAsync(entity: UserCache): Promise<UserCache | null> {

    }

    public static async deleteAsync(id: string): Promise<boolean> {

    }
}
