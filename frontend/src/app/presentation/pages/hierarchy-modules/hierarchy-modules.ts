import { PERMISSIONS } from '@/constants/permissions';
import { OrganizationModule } from '@/interfaces/modules.interface';
import { ModulesService } from '@/services/api/modules.service';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-hierarchy-modules',
  imports: [NgClass],
  templateUrl: './hierarchy-modules.html',
  styleUrl: './hierarchy-modules.scss',
})
export class HierarchyModules implements OnInit {
  modules = signal<OrganizationModule[]>([]);
  errorMsg = signal<string>('');

  modulesService = inject(ModulesService);

  ngOnInit(): void {
    const testRegister = {
      id: '1',
      name: 'Departamento',
      permissions: [PERMISSIONS.DELETE_USERS],
      parentId: '1',
    };

    this.modules.set([testRegister]);
  }

  getPermissionsString(permissions: string[]) {
    const permissionsString = permissions.reduce((acc, current) => {
      return acc + ' ' + current;
    });

    return permissionsString;
  }

  editModule(moduleId: string) {}

  canDeleteModule(moduleId: string) {}

  deleteModule(moduleId: string) {
    this.errorMsg.set('');
    this.modulesService.deleteOrganizationModule(moduleId).subscribe({
      next: () => {
        this.modules.update((current) => current.filter((elem) => elem.id !== moduleId));
      },
      error: () => this.errorMsg.set('El registro no se eliminó correctamente debido a un error'),
    });
  }
}
