import { OrganizationalUnitRepository } from "./organizational-unit.repository";

// Hashing cost; the higher, the safer but slower
const SALT_ROUNDS = 10;

export class OrganizationalUnitService {
  private organizationalUnitRepository: OrganizationalUnitRepository;

  constructor() {
    this.organizationalUnitRepository = new OrganizationalUnitRepository();
  }

  async getDownwardsTree(organizationalUnitId: string) {
    return await this.organizationalUnitRepository.getDownwardsTree(
      organizationalUnitId
    );
  }
}
