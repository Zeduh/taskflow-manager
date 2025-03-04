import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUsersAddPassword1738804100074 implements MigrationInterface {
    name = 'AlterUsersAddPassword1738804100074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
