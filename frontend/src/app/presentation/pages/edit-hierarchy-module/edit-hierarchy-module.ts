import { OrganizationModule, OrganizationModuleSubmit } from '@/interfaces/modules.interface';
import { Permission } from '@/interfaces/permissions.interface';
import { ModulesService } from '@/services/api/modules.service';
import { PermissionApiService } from '@/services/api/permission-api.service';
import { NgClass } from '@angular/common';
import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-hierarchy-module',
  imports: [NgClass, FormsModule],
  templateUrl: './edit-hierarchy-module.html',
  styleUrl: './edit-hierarchy-module.scss',
})
export class EditHierarchyModule implements OnInit {
  userPermissions = signal<Permission[]>([]);
  moduleId = signal<string | null>(null);
  parentModuleId = signal<string | null>(null);
  isEditionMode = computed(() => (this.moduleId() ? true : false));

  moduleName = model('');
  modulePermissions = model<string[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private modulesService = inject(ModulesService);
  private permissionsService = inject(PermissionApiService);

  constructor() {
    this.moduleId.set(this.route.snapshot.paramMap.get('id'));
    this.parentModuleId.set(this.route.snapshot.queryParamMap.get('parentId'));
  }

  ngOnInit(): void {
    this.getUserPermissions();

    if (this.isEditionMode()) {
      this.getModuleData(this.moduleId()!);
    }
  }

  getUserPermissions() {
    this.permissionsService.getUserPermissions().subscribe({
      next: (result) => this.userPermissions.set(result),
      error: () => console.error('Error while trying to fetch user permissions'),
    });
  }

  getModuleData(moduleId: string) {
    this.modulesService.getById(moduleId).subscribe({
      next: (module: OrganizationModule) => {
        this.moduleName.set(module.name);
        this.modulePermissions.set(module.permissions.map((elem) => elem.name));
        this.parentModuleId.set(module.parentId);
      },
      error: () => console.error(`Error fetching module with ID: ${moduleId}`),
    });
  }

  isPermissionSelected(permissionId: string): boolean {
    return this.modulePermissions().includes(permissionId);
  }

  onPermissionChange(permissionId: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    let currentPermissions = [...this.modulePermissions()];

    if (isChecked) {
      currentPermissions.push(permissionId);
    } else {
      currentPermissions = currentPermissions.filter((id) => id !== permissionId);
    }

    this.modulePermissions.set(currentPermissions);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const payload: OrganizationModuleSubmit = {
        name: this.moduleName(),
        parentId: this.parentModuleId() || '',
        permissions: this.modulePermissions(),
      };

      if (this.isEditionMode()) {
        this.modulesService.update(this.moduleId()!, payload);
      } else {
        this.modulesService.create(payload).subscribe({
          next: () => this.router.navigate(['/modules']),
        });
      }
    } else {
      console.error('Form is invalid.');
      Object.keys(form.controls).forEach((key) => {
        form.controls[key].markAsTouched();
      });
    }
  }
}
