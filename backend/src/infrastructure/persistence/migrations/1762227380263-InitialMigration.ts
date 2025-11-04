import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1762227380263 implements MigrationInterface {
    name = 'InitialMigration1762227380263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit_permissions" DROP CONSTRAINT "FK_37895739655c13dfaf49880e484"`);
        await queryRunner.query(`ALTER TABLE "unit_permissions" DROP CONSTRAINT "FK_8a1e07eecb8e9ca3851e3e31cb1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a1e07eecb8e9ca3851e3e31cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37895739655c13dfaf49880e48"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordHash" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_8a1e07eecb8e9ca3851e3e31cb" ON "unit_permissions" ("permissionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_37895739655c13dfaf49880e48" ON "unit_permissions" ("organizationalUnitId") `);
        await queryRunner.query(`ALTER TABLE "unit_permissions" ADD CONSTRAINT "FK_37895739655c13dfaf49880e484" FOREIGN KEY ("organizationalUnitId") REFERENCES "organizational_units"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit_permissions" ADD CONSTRAINT "FK_8a1e07eecb8e9ca3851e3e31cb1" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit_permissions" DROP CONSTRAINT "FK_8a1e07eecb8e9ca3851e3e31cb1"`);
        await queryRunner.query(`ALTER TABLE "unit_permissions" DROP CONSTRAINT "FK_37895739655c13dfaf49880e484"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37895739655c13dfaf49880e48"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a1e07eecb8e9ca3851e3e31cb"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordHash"`);
        await queryRunner.query(`CREATE INDEX "IDX_37895739655c13dfaf49880e48" ON "unit_permissions" ("organizationalUnitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a1e07eecb8e9ca3851e3e31cb" ON "unit_permissions" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "unit_permissions" ADD CONSTRAINT "FK_8a1e07eecb8e9ca3851e3e31cb1" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit_permissions" ADD CONSTRAINT "FK_37895739655c13dfaf49880e484" FOREIGN KEY ("organizationalUnitId") REFERENCES "organizational_units"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
