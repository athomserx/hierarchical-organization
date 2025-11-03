import { IMapper } from "@/shared/interfaces/IMapper";

export abstract class IRepository<T, U> implements IMapper<T, U> {
  abstract toDomain(entity: T): U;
  abstract toPersistence(domain: U): T;
}
