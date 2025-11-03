export interface IDtoMapper<T, U> {
  toDTO(entity: T): U;
  toEntity(dto: U): T;
}
