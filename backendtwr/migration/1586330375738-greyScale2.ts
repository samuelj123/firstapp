import {MigrationInterface, QueryRunner} from "typeorm";

export class greyScale21586330375738 implements MigrationInterface {
    name = 'greyScale21586330375738'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" ADD "greyscale" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "greyscale"`, undefined);
    }

}
