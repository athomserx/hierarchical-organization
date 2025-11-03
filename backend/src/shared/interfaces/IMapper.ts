export interface IMapper<T, U> {
  toDomain(entity: T): U;
  toPersistence(domain: U): T;
}
