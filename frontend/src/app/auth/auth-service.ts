import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { API_URL } from '@/constants/injection-tokens';
import { LoginCredentials, AuthResponse } from '@/auth/auth.interface';
import { TOKEN_STORAGE_KEY } from '@/constants/storage-keys';
import { LocalStorageService } from '@/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);
  private localStorageService = inject(LocalStorageService);

  login(user: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, user).pipe(
      catchError((error) => {
        console.error('There was an error while trying to login', error);

        throw new Error(error);
      }),
    );
  }

  logout() {
    return of(() => {
      this.localStorageService.removeItem(TOKEN_STORAGE_KEY);
    });
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: string) {
    // I was using cookies but due to an issue with it and the lack of time, I replaced it for localStorage
    this.localStorageService.setItem(TOKEN_STORAGE_KEY, token);
  }

  getToken() {
    return this.localStorageService.getItem(TOKEN_STORAGE_KEY);
  }
}
