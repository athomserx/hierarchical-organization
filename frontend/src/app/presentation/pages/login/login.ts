import { AuthService } from '@/auth/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = model<string>('');
  password = model<string>('');
  error = signal<string>('');
  isLoading = signal<boolean>(false);

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    this.isLoading.set(true);
    this.authService.login({ email: this.email(), password: this.password() }).subscribe({
      next: (data) => {
        this.authService.setToken(data.token);

        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.error.set(this.getErrorMessage(error));

        this.isLoading.set(false);
      },
    });
  }

  isValidForm() {
    return this.email() !== '' && this.password() !== '';
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 401 || error.status === 403) {
      return 'Credenciales inválidas';
    } else if (error.status >= 500) {
      return 'Ha ourrido un error en el servidor.';
    } else if (error.error instanceof ErrorEvent) {
      return 'Ha ourrido un error de conexión.';
    } else {
      return 'Ha ocurrido un error inesperado al intentar iniciar sesión.';
    }
  }
}
