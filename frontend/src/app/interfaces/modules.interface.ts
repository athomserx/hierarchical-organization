import { Permission } from './permissions.interface';

export interface OrganizationModule {
  id: string;
  name: string;
  parentId: string;
  permissions: Permission[];
}

export interface OrganizationModuleSubmit {
  name: string;
  parentId: string;
  permissions: string[];
}
