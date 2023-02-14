import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common'

import { Routing } from '@shared/routes/routing';
import { Observable } from 'rxjs'
import { User } from '@core/store/user.interfaces'
import { MatListModule } from '@angular/material/list'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-user-menu',
  standalone: true,
  template: `
    <div *ngIf="loggedUser$ | async as user">
      <div *ngIf="user.role === 0; else admin">
        <button mat-menu-item [routerLink]="[routing.TICKETS]">
          <mat-icon>confirmation_number</mat-icon>
          <p>{{ 'Moje bilety' | uppercase | translate }}</p>
        </button>
        <mat-divider></mat-divider>
        <button mat-menu-item [routerLink]="[routing.SETTINGS]">
          <mat-icon>settings</mat-icon>
          <p>{{ 'Ustawienia' | uppercase | translate }}</p>
        </button>
        <button mat-menu-item (click)="logoutHandler()">
          <mat-icon>exit_to_app</mat-icon>
          <p>{{ 'Wyloguj się' | uppercase | translate }}</p>
        </button>
      </div>
      <ng-template #admin>
        <button mat-menu-item [routerLink]="[routing.REPERTOIRE]">
          <mat-icon>local_movies</mat-icon>
          <p>{{ 'Repertuar' | uppercase | translate }}</p>
        </button>
        <button mat-menu-item [routerLink]="[routing.ADMIN]">
          <mat-icon>movies</mat-icon>
          <p>{{ 'Filmy' | uppercase | translate }}</p>
        </button>
        <button mat-menu-item [routerLink]="[routing.HALLS]">
          <mat-icon>meeting_room</mat-icon>
          <p>{{ 'Sale' | uppercase | translate }}</p>
        </button>
        <button mat-menu-item [routerLink]="[routing.ADMIN_USERS]">
          <mat-icon>person</mat-icon>
          <p>{{ 'Użytkownicy' | uppercase | translate }}</p>
        </button>
        <button mat-menu-item [routerLink]="[routing.PROMO_CODES]">
          <mat-icon>local_offer</mat-icon>
          <p>{{ 'Kody promocyjne' | uppercase | translate }}</p>
        </button>
        <button mat-menu-item [routerLink]="[routing.ADMIN_TICKETS]">
          <mat-icon>confirmation_number</mat-icon>
          <p>{{ 'Bilety' | uppercase | translate }}</p>
        </button>
        <button mat-menu-item [routerLink]="[routing.NEWSLETTER]">
          <mat-icon>mail</mat-icon>
          <p>{{ 'Newsletter' | uppercase | translate }}</p>
        </button>
        <mat-divider></mat-divider>
        <button mat-menu-item (click)="logoutHandler()">
          <mat-icon>exit_to_app</mat-icon>
          <p>{{ 'Wyloguj się' | uppercase | translate }}</p>
        </button>
      </ng-template>
    </div>
  `,
  styles: [
    `
      
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    AsyncPipe,
    MatMenuModule,
    MatListModule,
    UpperCasePipe,
    TranslateModule
  ]
})
export class UserMenuComponent {
  @Input() loggedUser$!: Observable<User>
  @Output() logout = new EventEmitter()

  routing = Routing;

  logoutHandler() {
    this.logout.emit()
  }
}
