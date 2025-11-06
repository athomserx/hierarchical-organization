import { UserEntity } from "@/infrastructure/persistence/entities/UserEntity";
import { IRepository } from "@/shared/contracts/IRepository";
import db from "@/infrastructure/persistence/AppDataSource";
import { NotFoundException } from "@/shared/exceptions/NotFoundException";
import { Repository } from "typeorm";
import { User } from "./user";

export class UsersRepository implements IRepository<UserEntity, User> {
  repo: Repository<UserEntity>;

  constructor() {
    this.repo = db.getRepository(UserEntity);
  }

  toDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      name: entity.name,
      lastName: entity.lastName,
      email: entity.email,
      bloodType: entity.bloodType,
      passwordHash: entity.passwordHash,
      organizationalUnit: entity.organizationalUnit,
      permissions: entity.permissions,
    });
  }

  toPersistence(user: User): UserEntity {
    return this.repo.create({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      passwordHash: user.passwordHash,
      bloodType: user.bloodType,
      organizationalUnitId: user.organizationalUnit.id,
      permissions: user.permissions,
    });
  }

  async create(user: User): Promise<User> {
    const userEntity = this.toPersistence(user);
    const userCreated = await this.repo.save(userEntity);

    return this.toDomain(userCreated);
  }

  async getByEmail(email: string): Promise<User> {
    const userEntity = await this.repo.findOne({
      where: {
        email: email,
      },
      relations: {
        organizationalUnit: true,
        permissions: true,
      },
    });

    if (!userEntity) {
      throw new NotFoundException("user");
    }

    return this.toDomain(userEntity);
  }

  async getById(id: string): Promise<User> {
    const userEntity = await this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        organizationalUnit: true,
      },
    });

    if (!userEntity) {
      throw new NotFoundException("user");
    }

    return this.toDomain(userEntity);
  }
}
