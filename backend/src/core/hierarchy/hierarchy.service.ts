import { UserEntity } from "@/infrastructure/persistence/entities/UserEntity";
import { IRepository } from "@/shared/contracts/IRepository";
import { User } from "../users/user";

export class HierarchyService implements IRepository<UserEntity, User> {
  toDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      name: entity.name,
      lastName: entity.lastName,
      email: entity.email,
      bloodType: entity.bloodType,
      organizationalUnit: entity.organizationalUnit,
    });
  }
}
