import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { map, Observable, of, take } from 'rxjs'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'

import { PromoCode, ShowingById } from 'src/app/features/home/shared/home.interfaces'
import { PromoCodeComponent } from '@shared/ui/stepper/contact-form/promo-form/promo-code.component'
import { ReservationsStore } from 'src/app/features/home/subpages/reservations/store/reservations.store'
import { Store } from '@ngrx/store'
import { selectLoggedUser } from '@core/store/user.selectors'
import { User } from '@core/store/user.interfaces'

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    NgIf,
    AsyncPipe,
    PromoCodeComponent,
    NgForOf
  ],
  template: `
    <div class="step2" *ngIf="showing$ | async as showing">
      <div class="info-wrapper">
        <p>
          {{ showing.title }}, sala nr {{ showing.hallno }}, {{ showing.start.split(' ')[0] }}, godz.
          {{ showing.start.split(' ')[1] }}
        </p>
      </div>
      <div class="ticket-wrapper" *ngFor="let ticket of selectedTickets$ | async">
        <div class="ticket-info">
          <p>Rząd {{ ticket.ticket[0] }} Miejsce {{ ticket.ticket.slice(1) }}</p>
          <p>{{ ticket.price }} zł</p>
        </div>
      </div>
      <div class="total-price" *ngIf="totalPrice$ | async as totalPrice">
        <p>Razem:</p>
        <p>{{ totalPrice.toFixed(2) }} zł</p>
      </div>
      <form [formGroup]="contactForm" (ngSubmit)="submitContactData()">
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Imię</mat-label>
          <input matInput placeholder="Imię" formControlName="firstName" />
          <mat-error></mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Nazwisko</mat-label>
          <input matInput placeholder="Nazwisko" formControlName="lastName" />
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Telefon</mat-label>
          <input matInput placeholder="Telefon" formControlName="phone" />
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Adres e-mail</mat-label>
          <input matInput type="email" placeholder="Adres e-mail" formControlName="email" />
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Powtórz adres e-mail</mat-label>
          <input matInput type="email" placeholder="Powtórz adres e-mail" formControlName="emailRepeat" />
        </mat-form-field>
        <mat-slide-toggle [checked]="toggleValue" (change)="toggleValue = !toggleValue" color="accent" formControlName="newsletter">
          Zgoda na otrzymywanie newslettera
        </mat-slide-toggle>
        <app-promo-code (promoCode)="promoCodeHandler($event)" [isPromoCodeApplied]="isPromoCodeApplied"></app-promo-code>
        <div class="button-wrapper">
          <button mat-stroked-button color="warn" matStepperPrevious>Wróć</button>
          <button type="submit" mat-raised-button color="primary" matStepperNext [disabled]="contactForm.invalid">Dalej</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .step2 {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .info-wrapper {
        font-size: 24px;
      }
      
      .ticket-wrapper {
        width: 400px;
      }
      
      .ticket-info {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
      }
      
      .total-price {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        width: 400px;
      }
      
      form {
        display: flex;
        flex-direction: column;
        width: 400px;
        gap: 16px;
        margin: 24px 0;
      }
      
      .button-wrapper {
        display: flex;
        justify-content: center;
        gap: 12px;
      }

      .button-wrapper button {
        width: 100px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent implements OnInit {
  @Input() showing$!: Observable<ShowingById>;
  @Input() promoCodes$!: Observable<PromoCode[]>;

  private formBuilder = inject(NonNullableFormBuilder)
  private store = inject(Store)
  private reservationStore = inject(ReservationsStore)

  readonly selectedTickets$ = this.reservationStore.state$.pipe(map((state) => state.selectedTickets))
  readonly userData$ = this.reservationStore.state$.pipe(map((state) => state.userData))

  contactForm = this.createContactForm()
  toggleValue = false;
  totalPrice$ = this.selectedTickets$.pipe(
    map((tickets) => tickets.reduce((acc, ticket) => +acc + +ticket.price, 0))
  )
  loggedInUser$ = this.store.select(selectLoggedUser)
  isPromoCodeApplied = false;

  ngOnInit() {
    this.loggedInUser$.subscribe((user: User) => {
      this.reservationStore.checkIfUserEmailIsInNewsletter(user?.email)
      this.userData$.subscribe((userData) => {
        this.contactForm.patchValue({
          firstName: user?.firstName,
          lastName: user?.lastName,
          phone: user?.phone,
          email: user?.email,
          emailRepeat: user?.email,
          newsletter: userData?.newsletter
        })

        if (userData.newsletter) {
          this.contactForm.get('newsletter')?.disable()
        }
      })
    })
  }

  promoCodeHandler(promo: string) {
    this.promoCodes$.subscribe((codes) => {
      const promoCode = codes.find((code) => code.promo_code === promo)
      if (promoCode) {
        this.isPromoCodeApplied = true;
        this.totalPrice$.subscribe((price) => {
          this.totalPrice$ = of(price * (1 - promoCode.value / 100))
        })
      }
    })
  }

  submitContactData() {
    this.contactForm.markAllAsTouched()

    if (this.contactForm.invalid) {
      return
    }

    this.totalPrice$.pipe(take(1)).subscribe((price) => {
      this.reservationStore.addTotalPrice(price)
    }).unsubscribe()

    this.loggedInUser$.pipe(take(1)).subscribe((user: User) => {
      this.reservationStore.addContactData({
        userId: user?.userId || null,
        firstName: this.contactForm.getRawValue().firstName,
        lastName: this.contactForm.getRawValue().lastName,
        phone: this.contactForm.getRawValue().phone,
        email: this.contactForm.getRawValue().email,
        newsletter: this.contactForm.getRawValue().newsletter,
      })
    })
  }

  private createContactForm() {
    return this.formBuilder.group({
      user_id: null,
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      phone: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      emailRepeat: this.formBuilder.control('', [Validators.required, Validators.email]),
      newsletter: this.formBuilder.control(false),
      discountCode: this.formBuilder.control(''),
    })
  }
}
