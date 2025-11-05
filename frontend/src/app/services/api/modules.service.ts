import { API_URL } from '@/constants/injection-tokens';
import { OrganizationModule } from '@/interfaces/modules.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  private apiUrl = inject(API_URL);
  private http = inject(HttpClient);

  getOrganizationModules(): Observable<OrganizationModule[]> {
    return this.http.get<OrganizationModule[]>(`${this.apiUrl}/modules`);
  }

  deleteOrganizationModule(moduleId: string) {
    return this.http.delete(`${this.apiUrl}/modules/${moduleId}`);
  }
}
