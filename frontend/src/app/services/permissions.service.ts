import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { USER_CLAIMS_STORAGE_KEY } from '@/constants/storage-keys';
import { Observable, throwError } from 'rxjs';
import { Permission } from '@/interfaces/permissions.interface';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private localStorageService = inject(LocalStorageService);

  hasPermission(permissionName: string): boolean {
    const userClaims = this.localStorageService.parseJSON<{ permissions: Permission[] }>(
      USER_CLAIMS_STORAGE_KEY,
    );

    return userClaims
      ? userClaims.permissions.map((permission) => permission.name).includes(permissionName)
      : false;
  }

  hasPermissions(permissionNames: string[]): boolean {
    const userClaims = this.localStorageService.parseJSON<{ permissions: Permission[] }>(
      USER_CLAIMS_STORAGE_KEY,
    );

    return userClaims
      ? userClaims.permissions.some((permission) => permissionNames.includes(permission.name))
      : false;
  }

  /**
   * Decorator for knowing whether a user is allowed to perform an action or not
   */
  HasPermissions(permissions: string[]) {
    const hasPermissions = this.hasPermissions(permissions);

    return function (descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: unknown[]): Observable<unknown> {
        if (hasPermissions) {
          return originalMethod.apply(this, args);
        } else {
          return throwError(
            () => new Error('You do not have permissions enough to perform this action'),
          );
        }
      };

      return descriptor;
    };
  }
}
