export interface OrganizationModule {
  id: string;
  name: string;
  parentId: string;
  permissions: string[];
}

export type OrganizationModuleSubmit = Omit<OrganizationModule, 'id'>;
