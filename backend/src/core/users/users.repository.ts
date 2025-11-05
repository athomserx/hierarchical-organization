import { UserEntity } from "@/infrastructure/persistence/entities/UserEntity";
import { IRepository } from "@/shared/contracts/IRepository";
import { User } from "./user";
import db from "@/infrastructure/persistence/AppDataSource";

export class UsersRepository implements IRepository<UserEntity, User> {
  userRepo = db.getRepository(UserEntity);

  toDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      name: entity.name,
      lastName: entity.lastName,
      email: entity.email,
      bloodType: entity.bloodType,
      passwordHash: entity.passwordHash,
      organizationalUnit: entity.organizationalUnit,
    });
  }

  toPersistence(user: User): UserEntity {
    return this.userRepo.create({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      passwordHash: user.passwordHash,
      bloodType: user.bloodType,
      organizationalUnitId: user.organizationalUnit.id,
    });
  }

  async create(user: User) {
    const userEntity = this.toPersistence(user);

    const userCreated = await this.userRepo.insert(userEntity);

    return this.toDomain(userEntity);
  }
}
