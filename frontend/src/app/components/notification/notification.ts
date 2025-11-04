import { NotificationService } from '@/services/notification.service';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NotificationMessage } from '@/interfaces/notification.interface';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);
  private destroy$ = new Subject<void>();

  notifications = signal<NotificationMessage[]>([]);

  ngOnInit() {
    this.notificationService
      .getUnreadNotifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (notifications) => {
          this.notifications.set(
            this.sortNotificationsByReadAndDate([...this.notifications(), ...notifications]),
          );
        },
        error: (err) => {
          console.error('Error while getting notifications', err);
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private sortNotificationsByReadAndDate(notifications: NotificationMessage[]) {
    return notifications.sort(
      (a, b) =>
        (a.read === b.read ? 0 : a.read ? 1 : -1) ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }
}
