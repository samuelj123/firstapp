import {MigrationInterface, QueryRunner} from "typeorm";

export class test1586330758780 implements MigrationInterface {
    name = 'test1586330758780'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "greyscale"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" ADD "greyscale" integer`, undefined);
    }

}
