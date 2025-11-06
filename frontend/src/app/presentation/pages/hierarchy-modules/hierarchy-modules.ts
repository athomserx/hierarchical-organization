import { PERMISSIONS } from '@/constants/permissions';
import { OrganizationModule } from '@/interfaces/modules.interface';
import { Permission } from '@/interfaces/permissions.interface';
import { ModulesService } from '@/services/api/modules.service';
import { PermissionsService } from '@/services/permissions.service';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hierarchy-modules',
  imports: [NgClass, RouterLink],
  templateUrl: './hierarchy-modules.html',
  styleUrl: './hierarchy-modules.scss',
})
export class HierarchyModules implements OnInit {
  modules = signal<OrganizationModule[]>([]);
  errorMsg = signal<string>('');
  canEditModule = signal(false);
  canDeleteModule = signal(false);

  modulesService = inject(ModulesService);
  permissionsService = inject(PermissionsService);
  router = inject(Router);

  constructor() {
    this.canEditModule.set(this.permissionsService.hasPermission(PERMISSIONS.EDIT_HIERARCHY));
    this.canDeleteModule.set(this.permissionsService.hasPermission(PERMISSIONS.DELETE_HIERARCHY));
  }

  ngOnInit(): void {
    this.modulesService.getAll().subscribe({
      next: (modules) => this.modules.set(modules),
    });
  }

  getPermissionsString(permissions: Permission[]) {
    return permissions.map((p) => p.name).join(' | ');
  }

  deleteModule(moduleId: string) {
    this.errorMsg.set('');
    this.modulesService.delete(moduleId).subscribe({
      next: () => {
        this.modules.update((current) => current.filter((elem) => elem.id !== moduleId));
      },
      error: () => this.errorMsg.set('El registro no se eliminó correctamente debido a un error'),
    });
  }
}
