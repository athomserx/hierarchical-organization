import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1762227195921 implements MigrationInterface {
    name = 'InitialMigration1762227195921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organizational_units" ("id" uuid NOT NULL, "name" character varying NOT NULL, "parentId" uuid, CONSTRAINT "PK_d818d009beb8256752e477fe4c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "read" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "bloodType" character varying NOT NULL, "email" character varying NOT NULL, "organizationalUnitId" uuid NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unit_permissions" ("organizationalUnitId" uuid NOT NULL, "permissionId" uuid NOT NULL, CONSTRAINT "PK_ad148c9231e4983e6ed5b906c7b" PRIMARY KEY ("organizationalUnitId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8a1e07eecb8e9ca3851e3e31cb" ON "unit_permissions" ("permissionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_37895739655c13dfaf49880e48" ON "unit_permissions" ("organizationalUnitId") `);
        await queryRunner.query(`ALTER TABLE "organizational_units" ADD CONSTRAINT "FK_fe600fcf2575310e563ce0096f2" FOREIGN KEY ("parentId") REFERENCES "organizational_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_edfbb7b43de6b461cae42e3cbe1" FOREIGN KEY ("organizationalUnitId") REFERENCES "organizational_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit_permissions" ADD CONSTRAINT "FK_37895739655c13dfaf49880e484" FOREIGN KEY ("organizationalUnitId") REFERENCES "organizational_units"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit_permissions" ADD CONSTRAINT "FK_8a1e07eecb8e9ca3851e3e31cb1" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit_permissions" DROP CONSTRAINT "FK_8a1e07eecb8e9ca3851e3e31cb1"`);
        await queryRunner.query(`ALTER TABLE "unit_permissions" DROP CONSTRAINT "FK_37895739655c13dfaf49880e484"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_edfbb7b43de6b461cae42e3cbe1"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "organizational_units" DROP CONSTRAINT "FK_fe600fcf2575310e563ce0096f2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37895739655c13dfaf49880e48"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a1e07eecb8e9ca3851e3e31cb"`);
        await queryRunner.query(`DROP TABLE "unit_permissions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "organizational_units"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
