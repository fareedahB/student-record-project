import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGradesTable1784805590027 implements MigrationInterface {
    name = 'AddGradesTable1784805590027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "grades" ("id" SERIAL NOT NULL, "score" integer NOT NULL, "semester" character varying NOT NULL, "studentId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "UQ_d01679906bb7d32f5601cf49834" UNIQUE ("studentId", "courseId", "semester"), CONSTRAINT "PK_4740fb6f5df2505a48649f1687b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_fcfc027e4e5fb37a4372e688070" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_ff09424ef05361e1c47fa03d82b" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_ff09424ef05361e1c47fa03d82b"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_fcfc027e4e5fb37a4372e688070"`);
        await queryRunner.query(`DROP TABLE "grades"`);
    }

}
