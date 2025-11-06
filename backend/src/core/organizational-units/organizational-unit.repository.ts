import { IRepository } from "@/shared/contracts/IRepository";
import { OrganizationalUnit } from "./organizational-unit";
import { OrganizationalUnitEntity } from "@/infrastructure/persistence/entities/OrganizationalUnitEntity";
import { Repository } from "typeorm";
import db from "@/infrastructure/persistence/AppDataSource";

export class OrganizationalUnitRepository
  implements IRepository<OrganizationalUnitEntity, OrganizationalUnit>
{
  repo: Repository<OrganizationalUnitEntity>;

  constructor() {
    this.repo = db.getRepository(OrganizationalUnitEntity);
  }

  toDomain(entity: OrganizationalUnitEntity): OrganizationalUnit {
    return new OrganizationalUnit({
      id: entity.id,
      name: entity.name,
      parent: entity.parent,
      permissions: entity.permissions,
    });
  }

  toPersistence(
    organizationalUnit: OrganizationalUnit
  ): OrganizationalUnitEntity {
    return this.repo.create({
      id: organizationalUnit.id,
      name: organizationalUnit.name,
      parentId: organizationalUnit.parent?.id,
    });
  }

  async getDownwardsTree(
    organizationalUnitId: string
  ): Promise<OrganizationalUnit[]> {
    const entity = await this.repo.findOne({
      where: { id: organizationalUnitId },
      relations: {
        permissions: true,
      },
      select: {
        id: true,
        name: true,
        parentId: true,
        permissions: true,
      },
    });

    if (!entity) {
      throw new Error("Organizational unit not found");
    }

    const collectDescendants = async (
      unit: OrganizationalUnitEntity,
      acc: OrganizationalUnit[] = []
    ): Promise<OrganizationalUnit[]> => {
      const children = await this.repo.find({
        where: { parent: { id: unit.id } },
        relations: { parent: true, permissions: true },
        select: {
          permissions: true,
        },
      });

      const domainChildren = children.map((child) => this.toDomain(child));
      acc.push(...domainChildren);

      for (const child of children) {
        await collectDescendants(child, acc);
      }

      return acc;
    };

    return collectDescendants(entity, [this.toDomain(entity)]);
  }
}
