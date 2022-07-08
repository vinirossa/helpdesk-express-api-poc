import { NodeEnv } from "../enums/node-env.enum";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_AUTH_TOKEN: string;
            NODE_ENV: NodeEnv;
            DB_URL?: string;
            DB_PORT: string;
            DB_HOST: string;
            DB_DEFAULT_DB: string;
            DB_USER: string;
            DB_PWD: string;
        }
    }
}

export {};
