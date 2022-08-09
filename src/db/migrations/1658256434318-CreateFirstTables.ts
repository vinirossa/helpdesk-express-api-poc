import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFirstTables1658256434318 implements MigrationInterface {
    name = 'CreateFirstTables1658256434318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "createdBy" character varying,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "updatedBy" character varying,
                "name" character varying NOT NULL,
                "email" character varying(320) NOT NULL,
                "password" character varying NOT NULL,
                "profile" integer NOT NULL,
                "emailConfirmed" boolean NOT NULL DEFAULT false,
                "confirmationToken" character varying,
                "resetToken" character varying,
                "lastPasswordReset" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users_password_history" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "createdBy" character varying,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "updatedBy" character varying,
                "password" character varying NOT NULL,
                "userId" uuid,
                CONSTRAINT "PK_de7dbb38b2b9bbfd9ffc79fa6cd" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "users_password_history"
            ADD CONSTRAINT "FK_fccf1718c20afdc03c322385fdc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users_password_history" DROP CONSTRAINT "FK_fccf1718c20afdc03c322385fdc"
        `);
        await queryRunner.query(`
            DROP TABLE "users_password_history"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
