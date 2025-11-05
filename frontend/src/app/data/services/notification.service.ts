import { inject, Injectable } from '@angular/core';
import { NotificationMessage } from '@/interfaces/notification.interface';
import { Observable, repeat, retry, timer } from 'rxjs';
import { API_URL } from '@/constants/injection-tokens';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = inject(API_URL);
  private http = inject(HttpClient);

  private getNotifications(): Observable<NotificationMessage[]> {
    return this.http.get<NotificationMessage[]>(`${this.apiUrl}/notifications`);
  }

  getUnreadNotifications(retryDelayMs = 3000): Observable<NotificationMessage[]> {
    return this.getNotifications().pipe(
      retry({
        delay: (error) => {
          console.error(`Error in long polling, retrying in ${retryDelayMs}ms...`, error);

          return timer(retryDelayMs);
        },
      }),
      repeat(),
    );
  }
}
