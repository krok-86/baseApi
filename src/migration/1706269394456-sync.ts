import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1706269394456 implements MigrationInterface {
    name = 'Sync1706269394456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "fullName" character varying(230) NOT NULL,
                "email" text NOT NULL,
                "dob" date NOT NULL DEFAULT now(),
                "password" character varying NOT NULL,
                "avatarImg" character varying NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
