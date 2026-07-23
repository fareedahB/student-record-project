import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedByToStudent1784649856594 implements MigrationInterface {
    name = 'AddCreatedByToStudent1784649856594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ADD "createdByUserId" integer`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_874d90d2a9bc172bb63033ea971" FOREIGN KEY ("createdByUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_874d90d2a9bc172bb63033ea971"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "createdByUserId"`);
    }

}
