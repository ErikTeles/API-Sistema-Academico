import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1760577514100 implements MigrationInterface {
    name = 'Default1760577514100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "curso" ADD CONSTRAINT "UQ_3a8a973f27c4319e3dc2044c074" UNIQUE ("tx_descricao")`);
        await queryRunner.query(`ALTER TABLE "curso" ALTER COLUMN "tx_descricao" DROP DEFAULT`);
        await queryRunner.query(`CREATE INDEX "IDX_13dc3b038d8c3dbf1e0294c5a5" ON "leciona" ("id_professor") `);
        await queryRunner.query(`CREATE INDEX "IDX_f11e2805302cbdbd19e289fcca" ON "leciona" ("id_disciplina") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f11e2805302cbdbd19e289fcca"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13dc3b038d8c3dbf1e0294c5a5"`);
        await queryRunner.query(`ALTER TABLE "curso" ALTER COLUMN "tx_descricao" SET DEFAULT '{"kind": "NoDefault"}'`);
        await queryRunner.query(`ALTER TABLE "curso" DROP CONSTRAINT "UQ_3a8a973f27c4319e3dc2044c074"`);
    }

}
