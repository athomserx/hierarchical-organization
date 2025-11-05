import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable } from 'rxjs';
import { API_URL } from '@/constants/injection-tokens';
import { LoginCredentials, AuthResponse } from '@/auth/auth.interface';
import { TOKEN_STORAGE_KEY } from '@/constants/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);
  private cookies = inject(CookieService);
  private readonly cookieOptions = {
    sameSite: 'Lax' as const,
  };

  login(user: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, user).pipe(
      catchError((error) => {
        console.error('There was an error while trying to login', error);

        throw new Error(error);
      }),
    );
  }

  logout() {
    this.cookies.delete(TOKEN_STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: string) {
    this.cookies.set(TOKEN_STORAGE_KEY, token, this.cookieOptions);
  }

  getToken() {
    return this.cookies.get(TOKEN_STORAGE_KEY);
  }
}
