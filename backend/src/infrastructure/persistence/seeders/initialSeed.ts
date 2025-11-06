import * as bcrypt from "bcryptjs";
import { v7 as uuidv7 } from "uuid";
import db from "../AppDataSource";
import { PermissionEntity } from "../entities/PermissionEntity";
import { UserEntity } from "../entities/UserEntity";
import { OrganizationalUnitEntity } from "../entities/OrganizationalUnitEntity";

const initialPermissions = [
  { id: uuidv7(), name: "view_hierarchy" },
  { id: uuidv7(), name: "edit_hierarchy" },
  { id: uuidv7(), name: "delete_hierarchy" },
  { id: uuidv7(), name: "view_users" },
  { id: uuidv7(), name: "edit_users" },
  { id: uuidv7(), name: "delete_users" },
];

const mainOrganization = {
  id: uuidv7(),
  name: "Organization",
};

const adminUserSeed = {
  id: uuidv7(),
  name: "Admin",
  lastName: "User",
  email: "admin@admin.com",
  organizationalUnitId: mainOrganization.id,
  bloodType: "A-",
  password: "123456",
};

/**
 * Seeds the initial data (Permissions and Admin User).
 */
async function runSeeders() {
  await db.initialize();

  try {
    const permissionRepo = db.getRepository(PermissionEntity);
    const userRepo = db.getRepository(UserEntity);
    const organizationRepo = db.getRepository(OrganizationalUnitEntity);

    const organizationEntity = permissionRepo.create(mainOrganization);
    await organizationRepo.save(organizationEntity);

    const permissionEntities = permissionRepo.create(initialPermissions);
    await permissionRepo.save(permissionEntities);

    const hashedPassword = await bcrypt.hash(adminUserSeed.password, 10);
    const newUser = userRepo.create({
      ...adminUserSeed,
      passwordHash: hashedPassword,
    });

    await userRepo.save(newUser);
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await db.destroy();
  }
}

runSeeders();
