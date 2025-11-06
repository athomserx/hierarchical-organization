import { API_URL } from '@/constants/injection-tokens';
import { Permission } from '@/interfaces/permissions.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionApiService {
  private apiUrl = inject(API_URL);
  private http = inject(HttpClient);

  getUserPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.apiUrl}/permissions`);
  }
}
