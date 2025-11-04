import { NotificationService } from '@/services/notification.service';
import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { filter, Subject, switchMap, take, takeUntil } from 'rxjs';
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
  private appRef = inject(ApplicationRef);

  notifications = signal<NotificationMessage[]>([]);

  ngOnInit() {
    this.appRef.isStable
      .pipe(
        // Since we're using SSR and client-side hydration, we need to wait for the app to be stable
        filter((stable) => stable === true),
        take(1),
        switchMap(() => this.notificationService.getUnreadNotifications()),
        takeUntil(this.destroy$),
      )
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
