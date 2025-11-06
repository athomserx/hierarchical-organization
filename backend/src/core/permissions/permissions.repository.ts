import { PermissionEntity } from "@/infrastructure/persistence/entities/PermissionEntity";
import { IRepository } from "@/shared/contracts/IRepository";
import { Permission } from "./Permission";
import { Repository } from "typeorm";
import db from "@/infrastructure/persistence/AppDataSource";
import { UserPermissionsEntity } from "@/infrastructure/persistence/entities/UserPermissionsEntity";

export class PermissionsRepository
  implements IRepository<PermissionEntity, Permission>
{
  repo: Repository<PermissionEntity>;
  userPermissionsRepo: Repository<UserPermissionsEntity>;

  constructor() {
    this.repo = db.getRepository(PermissionEntity);
    this.userPermissionsRepo = db.getRepository(UserPermissionsEntity);
  }

  toDomain(entity: PermissionEntity): Permission {
    return new Permission({
      id: entity.id,
      name: entity.name,
    });
  }

  toPersistence(permission: Permission): PermissionEntity {
    return this.repo.create({
      id: permission.id,
      name: permission.name,
    });
  }

  async getUserPermissions(userId: string): Promise<Permission[]> {
    const userPermissions = this.userPermissionsRepo.find({
      where: { userId: userId },
      relations: { permission: true },
    });

    // I think there should be a UserPermission class and a repo that allows the mapper functionality
    // but in this case, I will let it as is it
    return (await userPermissions).map(
      (userPermission) => userPermission.permission
    );
  }
}
