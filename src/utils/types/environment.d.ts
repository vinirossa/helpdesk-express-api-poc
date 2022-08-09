import { NodeEnv } from "../enums/node-env.enum";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: NodeEnv;

            DB_PG_URL: string
            DB_PG_PORT?: string;
            DB_PG_HOST?: string;
            DB_PG_DEF_DB?: string;
            DB_PG_USER?: string;
            DB_PG_PWD?: string;

            DB_MG_URL: string

            DB_REDIS_URL: string

            JWT_RESET_SECRET: string;
            JWT_CONFIRMATION_SECRET: string;
            JWT_AUTH_SECRET: string;

            SMTP_HOST: string;
            SMTP_SERVICE: string;
            SMTP_PORT: number;
            SMTP_USER: string;
            SMTP_PWD: string;
        }
    }
}
