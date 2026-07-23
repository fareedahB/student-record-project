import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameCourseToDepartment1784814152231 implements MigrationInterface {
    name = 'RenameCourseToDepartment1784814152231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" RENAME COLUMN "course" TO "department"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" RENAME COLUMN "department" TO "course"`);
    }

}
