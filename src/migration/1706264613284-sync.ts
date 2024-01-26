import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1706264613284 implements MigrationInterface {
    name = 'Sync1706264613284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatarImg" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatarImg"
        `);
    }

}
