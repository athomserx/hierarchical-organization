import * as bcrypt from "bcryptjs";
import { v7 as uuidv7 } from "uuid";
import db from "../AppDataSource";
import { PermissionEntity } from "../entities/PermissionEntity";
import { UserEntity } from "../entities/UserEntity";
import { OrganizationalUnitEntity } from "../entities/OrganizationalUnitEntity";
import { UnitPermissionEntity } from "../entities/UnitPermissionEntity";

const permissions = [
  { id: uuidv7(), name: "view_hierarchy" },
  { id: uuidv7(), name: "edit_hierarchy" },
  { id: uuidv7(), name: "delete_hierarchy" },
  { id: uuidv7(), name: "view_users" },
  { id: uuidv7(), name: "edit_users" },
  { id: uuidv7(), name: "delete_users" },
];

const mainOrganizationUnit = {
  id: uuidv7(),
  name: "Organization",
};

const adminUser = {
  id: uuidv7(),
  name: "Admin",
  lastName: "User",
  email: "admin@admin.com",
  organizationalUnitId: mainOrganizationUnit.id,
  bloodType: "A-",
  password: "123456",
};

const unitPermissions = permissions.map((permission) => ({
  organizationalUnitId: mainOrganizationUnit.id,
  permissionId: permission.id,
}));

/**
 * Seeds the initial data (Permissions and Admin User).
 */
async function runSeeders() {
  await db.initialize();

  try {
    const permissionRepo = db.getRepository(PermissionEntity);
    const userRepo = db.getRepository(UserEntity);
    const organizationRepo = db.getRepository(OrganizationalUnitEntity);
    const unitPermissionRepo = db.getRepository(UnitPermissionEntity);

    const organizationEntity = permissionRepo.create(mainOrganizationUnit);
    await organizationRepo.save(organizationEntity);

    const permissionEntities = permissionRepo.create(permissions);
    await permissionRepo.save(permissionEntities);

    const unitPermissionEntities = unitPermissionRepo.create(unitPermissions);
    await unitPermissionRepo.save(unitPermissionEntities);

    const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    const newUser = userRepo.create({
      ...adminUser,
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
