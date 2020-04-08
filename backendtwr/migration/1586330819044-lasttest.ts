import {MigrationInterface, QueryRunner} from "typeorm";

export class lasttest1586330819044 implements MigrationInterface {
    name = 'lasttest1586330819044'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" ADD "greyscale" integer`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "greyscale"`, undefined);
    }

}
