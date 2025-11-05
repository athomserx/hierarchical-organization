import { API_URL } from '@/constants/injection-tokens';
import { OrganizationModule, OrganizationModuleSubmit } from '@/interfaces/modules.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  private apiUrl = inject(API_URL);
  private http = inject(HttpClient);

  getAll(): Observable<OrganizationModule[]> {
    return this.http.get<OrganizationModule[]>(`${this.apiUrl}/modules`);
  }

  getById(moduleId: string): Observable<OrganizationModule> {
    return this.http.get<OrganizationModule>(`${this.apiUrl}/modules/${moduleId}`);
  }

  create(payload: OrganizationModuleSubmit) {
    return this.http.post(`${this.apiUrl}/modules`, payload);
  }

  update(moduleId: string, payload: OrganizationModuleSubmit) {
    return this.http.put(`${this.apiUrl}/modules/${moduleId}`, payload);
  }

  delete(moduleId: string) {
    return this.http.delete(`${this.apiUrl}/modules/${moduleId}`);
  }
}
