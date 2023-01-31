import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { selectLoggedUser } from '@core/store/user.selectors'
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common'

import { Routing } from '@shared/routes/routing'
import { SideNavComponent } from '@shared/ui/side-nav/side-nav.component'

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
      <button mat-icon-button>
        <mat-icon>favorite</mat-icon>
      </button>
      <div *ngIf="loggedUser$ | async as user">
        <button mat-icon-button class="initials" matTooltip="Konto" *ngIf="user.userId; else notLogged">
          <div *ngIf="user.role === 0; else admin">
            {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
          </div>
          <ng-template #admin>
            <div>
              {{ user.firstName.charAt(0) }}
            </div>
          </ng-template>
        </button>
        <ng-template #notLogged>
          <button mat-icon-button [routerLink]="[routing.LOGIN]">
            <mat-icon>login</mat-icon>
          </button>
        </ng-template>
      </div>
    </mat-toolbar>
  `,
  styles: [`
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
      background-color: #FFF;
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
  `],
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
    SideNavComponent
  ]
})

export class HeaderComponent {
  @Input() open!: boolean;
  @Output() openChange = new EventEmitter<boolean>();
  private store = inject(Store)

  routing = Routing
  loggedUser$ = this.store.select(selectLoggedUser)

  toggleDrawer() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }
}