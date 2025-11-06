import bcrypt from "bcrypt";
import { UsersRepository } from "./users.repository";
// import { NotificationsService } from "./notifications.service";
// import { HierarchyService } from "./hierarchy.service";
// import { User, UserUpdateData } from "./user.interface";
import { UserRequestDto } from "./user.interface";
import { User } from "./user";
import { Permission } from "../permissions/Permission";
import { PermissionsRepository } from "../permissions/permissions.repository";

// Hashing cost; the higher, the safer but slower
const SALT_ROUNDS = 10;

export class UsersService {
  private usersRepository: UsersRepository;
  private permissionsRepository: PermissionsRepository;
  // private notificationsService: NotificationsService;
  // private hierarchyService: HierarchyService;

  constructor() {
    this.usersRepository = new UsersRepository();
    this.permissionsRepository = new PermissionsRepository();
    // this.notificationsService = new NotificationsService();
    // this.hierarchyService = new HierarchyService();
  }

  // public async createUser(
  //   userData: UserRequestDto
  // ): Promise<Omit<User, "password_hash">> {
  //   const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

  //   const newUser = await this.usersRepository.create(
  //     new User({
  //       name: userData.name,
  //       lastName: userData.lastName,
  //       email: userData.email,
  //       bloodType: userData.bloodType,
  //       OrganizationalUnitId: userData.organizationalUnitId,
  //     }),
  //     hashedPassword
  //   );

  //   return newUser;
  // }

  public async findAllUsers() {
    // TODO
    // return this.usersRepository.findAll();
  }

  // public async findUserById(id: string): Promise<User> {
  //   // TODO
  //   // return this.usersRepository.findById(id);
  // }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.getByEmail(email);

    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.usersRepository.getById(id);

    return user;
  }

  // TODO
  // public async updateUser(
  //   userId: string,
  //   updateData: UserUpdateData
  // ): Promise<User> {
  //   const userBeforeUpdate = await this.usersRepository.findById(userId);

  //   if (!userBeforeUpdate) {
  //     throw new Error("User not found");
  //   }

  //   if (
  //     updateData.organizational_unit_id &&
  //     updateData.organizational_unit_id !==
  //       userBeforeUpdate.organizational_unit_id
  //   ) {
  //     // Trigger notification before update
  //     await this.notificationsService.createNotification(
  //       userId,
  //       "Your role inside the organization has changed"
  //     );
  //   }

  //   if (updateData.password) {
  //     updateData.password_hash = await bcrypt.hash(
  //       updateData.password,
  //       SALT_ROUNDS
  //     );
  //     delete updateData.password;
  //   }

  //   return this.usersRepository.update(userId, updateData);
  // }

  public async calculateUserPermissions(userId: string): Promise<Permission[]> {
    const user = await this.usersRepository.getById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const userPermissions = await this.permissionsRepository.getUserPermissions(
      userId
    );

    return userPermissions;
  }
}
