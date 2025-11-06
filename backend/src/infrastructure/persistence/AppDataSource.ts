import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { NotificationEntity } from "./entities/NotificationEntity";
import { OrganizationalUnitEntity } from "./entities/OrganizationalUnitEntity";
import { UserEntity } from "./entities/UserEntity";
import { UnitPermissionEntity } from "./entities/UnitPermissionEntity";
import { PermissionEntity } from "./entities/PermissionEntity";

dotenv.config();

const db = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["./src/infrastructure/persistence/entities/*.ts"],
  migrations: ["./src/infrastructure/persistence/migrations/*.ts"],
  migrationsTableName: "migrations",
});

export default db;
