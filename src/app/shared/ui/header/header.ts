import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from '@core/store/user.selectors';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

import { Routing } from '@shared/routes/routing';
import { SideNavComponent } from '@shared/ui/side-nav/side-nav.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="toggleDrawer()">
        <mat-icon [class]="open ? 'menu-open' : 'menu-close'">menu</mat-icon>
      </button>
      <span [routerLink]="[routing.HOME]">Cinvelo</span>
      <span class="spacer"></span>
      <div class="icons-wrapper" *ngIf="loggedUser$ | async as user">
        <button mat-icon-button *ngIf="user.userId">
          <mat-icon>shopping_cart</mat-icon>
        </button>
        <button mat-icon-button *ngIf="user.userId" [routerLink]="routing.WISHLIST">
          <mat-icon>favorite</mat-icon>
        </button>
      </div>
      <div *ngIf="loggedUser$ | async as user">
        <button
          mat-icon-button
          class="initials"
          matTooltip="Konto"
          *ngIf="user.userId; else notLogged"
          [matMenuTriggerFor]="userMenu">
          <div *ngIf="user.role === 0; else admin">{{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}</div>
          <ng-template #admin>
            <div>
              {{ user.firstName.charAt(0) }}
            </div>
          </ng-template>
        </button>
        <mat-menu #userMenu yPosition="below">
          <button mat-menu-item>
            <mat-icon>person</mat-icon>
            <p>Moje konto</p>
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <p>Wyloguj się</p>
          </button>
        </mat-menu>
        <ng-template #notLogged>
          <button mat-icon-button [routerLink]="[routing.LOGIN]">
            <mat-icon>login</mat-icon>
          </button>
        </ng-template>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      mat-toolbar {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
      }

      .spacer {
        flex: 1 1 auto;
      }

      .initials {
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: #fff;
        color: #000;
        font-size: 18px;
        border: 1px solid rgba(0, 0, 0, 0.6);
      }

      span {
        font-size: 22px;
        cursor: pointer;
      }

      .menu-open {
        transform: rotate(90deg);
        transition: transform 0.3s ease-in-out;
      }

      .menu-close {
        transform: rotate(180deg);
        transition: transform 0.3s ease-in-out;
      }

      .icons-wrapper {
        margin-right: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
    NgIf,
    AsyncPipe,
    JsonPipe,
    SideNavComponent,
    MatMenuModule,
  ],
})
export class HeaderComponent {
  @Input() open!: boolean;
  @Output() openChange = new EventEmitter<boolean>();

  private store = inject(Store);
  private cookieService = inject(CookieService);

  routing = Routing;
  loggedUser$ = this.store.select(selectLoggedUser);

  toggleDrawer() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }

  logout() {
    this.cookieService.delete('token');
    window.location.reload();
  }
}
