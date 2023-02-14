import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from '@core/store/user.selectors';
import { AsyncPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common'
import { CookieService } from 'ngx-cookie-service';

import { Routing } from '@shared/routes/routing';
import { UserMenuComponent } from '@shared/ui/user-menu/user-menu.component'
import { MatBadgeModule } from '@angular/material/badge'
import { SearchTicketMenuComponent } from '@shared/ui/search-ticket-menu/search-ticket-menu.component'
import { TicketActions } from 'src/app/features/home/store/home.actions'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { Languages } from '@shared/ui/header/constants/languages'

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
    MatMenuModule,
    UserMenuComponent,
    MatBadgeModule,
    SearchTicketMenuComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    UpperCasePipe,
    TranslateModule,
    NgForOf
  ]
})
export class HeaderComponent {
  private store = inject(Store);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private formBuilder = inject(NonNullableFormBuilder);

  routing = Routing;
  loggedUser$ = this.store.select(selectLoggedUser);
  langForm = this.createForm()
  languages = Languages

  ngOnInit() {
    if (this.cookieService.check('lang')) {
      this.langForm.patchValue({
        lang: this.cookieService.get('lang')
      })
    }
  }

  createLinkToReservation() {
    if (this.cookieService.check('selectedTickets')) {
      const selectedTickets = JSON.parse(this.cookieService.get('selectedTickets'));
      if (selectedTickets.length) {
        return `/reservation/${selectedTickets[0].showingId}`;
      }
    }
    return;
  }

  changeLanguage(event: any) {
    const lang = event.target.value
    this.translate.use(lang);
    this.cookieService.set('lang', lang, 365, '/');
  }

  ticketSearchHandler(formData: { ticketNumber: string, email: string }) {
    this.store.dispatch(TicketActions.getTicket({ ticket_no: +formData.ticketNumber, email: formData.email }))
  }

  logoutHandler() {
    this.router.navigate(['/']).then(
      () => {
        window.location.reload();
        this.cookieService.delete('token');
      }
    )
  }

  get isTicketInCart() {
    if (this.cookieService.check('selectedTickets')) {
      if (JSON.parse(this.cookieService.get('selectedTickets')).length) {
        return true;
      }
    }
    return false;
  }

  private createForm() {
    return this.formBuilder.group({
      lang: this.formBuilder.control('pl'),
    });
  }
}
