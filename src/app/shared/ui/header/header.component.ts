import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { CookieService } from 'ngx-cookie-service';
import { UserMenuComponent } from '@shared/ui/user-menu/user-menu.component'
import { MatBadgeModule } from '@angular/material/badge'
import { SearchTicketMenuComponent } from '@shared/ui/search-ticket-menu/search-ticket-menu.component'
import { TicketActions } from 'src/app/features/home/store/home.actions'

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
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
    MatMenuModule,
    UserMenuComponent,
    MatBadgeModule,
    SearchTicketMenuComponent
  ]
})
export class HeaderComponent {
  private store = inject(Store);
  private cookieService = inject(CookieService);

  routing = Routing;
  loggedUser$ = this.store.select(selectLoggedUser);

  createLinkToReservation() {
    if (this.cookieService.check('selectedTickets')) {
      const selectedTickets = JSON.parse(this.cookieService.get('selectedTickets'));
      if (selectedTickets.length) {
        return `/reservation/${selectedTickets[0].showingId}`;
      }
    }
    return;
  }

  ticketSearchHandler(formData: { ticketNumber: string, email: string }) {
    this.store.dispatch(TicketActions.getTicket({ ticket_no: +formData.ticketNumber, email: formData.email }))
  }

  logout() {
    this.cookieService.delete('token');
    window.location.reload();
  }

  get isTicketInCart() {
    if (this.cookieService.check('selectedTickets')) {
      if (JSON.parse(this.cookieService.get('selectedTickets')).length) {
        return true;
      }
    }
    return false;
  }
}
