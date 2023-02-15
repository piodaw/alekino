import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { map, Observable, of, take } from 'rxjs'
import { AsyncPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common'

import { PromoCode, ShowingById } from 'src/app/features/home/shared/home.interfaces'
import { PromoCodeComponent } from '@shared/ui/stepper/contact-form/promo-form/promo-code.component'
import { ReservationsStore } from 'src/app/features/home/subpages/reservations/store/reservations.store'
import { Store } from '@ngrx/store'
import { selectLoggedUser } from '@core/store/user.selectors'
import {
  allowOnlyLettersValidator,
  allowOnlyNumbersValidator,
  emailValidator,
  whitespaceValidator
} from '@shared/validators/form.validators'
import { getErrorMessage } from '@shared/form-errors/form.errors'
import { TranslateModule } from '@ngx-translate/core'
import { NumbersOnlyDirective } from '@shared/directives/onlyNumbers.directive';

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
    NgForOf,
    UpperCasePipe,
    TranslateModule,
    NumbersOnlyDirective
  ],
  template: `
    <div class="step2" *ngIf="showing$ | async as showing">
      <div class="info-wrapper">
        <p>
          {{ showing.title }}, {{ 'sala' | uppercase | translate }} {{ 'nr' | uppercase | translate }} {{ showing.hallno }}, {{ showing.start.split(' ')[0] }},
          {{ 'godz.' | uppercase | translate }}
          {{ showing.start.split(' ')[1] }}
        </p>
      </div>
      <div class="ticket-wrapper" *ngFor="let ticket of selectedTickets$ | async">
        <div class="ticket-info">
          <p>{{ 'Rząd' | uppercase | translate }} {{ ticket.ticket[0] }} {{ 'Miejsce' | uppercase | translate }} {{ ticket.ticket.slice(1) }}</p>
          <p>{{ ticket.price }} zł</p>
        </div>
      </div>
      <div class="total-price" *ngIf="totalPrice$ | async as totalPrice">
        <p>{{ 'Razem' | uppercase | translate }}:</p>
        <p>{{ totalPrice.toFixed(2) }} zł</p>
      </div>
      <form [formGroup]="contactForm" (ngSubmit)="submitContactData()">
        <mat-form-field appearance="outline" color="accent">
          <mat-label>{{ 'Imię' | uppercase | translate }}</mat-label>
          <input matInput [placeholder]="'Imię' | uppercase | translate " formControlName="firstName" />
          <mat-error *ngIf="errorMessage('firstName') as message">{{ message | uppercase | translate  }}</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>{{ 'Nazwisko' | uppercase | translate }}</mat-label>
          <input matInput [placeholder]="'Nazwisko' | uppercase | translate " formControlName="lastName" />
          <mat-error *ngIf="errorMessage('lastName') as message">{{ message | uppercase | translate  }}</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>{{ 'Telefon' | uppercase | translate }}</mat-label>
          <input matInput appNumbersOnly [placeholder]="'Telefon' | uppercase | translate " formControlName="phoneNumber" />
          <mat-error *ngIf="errorMessage('phoneNumber') as message">{{ message | uppercase | translate  }}</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>{{ 'Adres e-mail' | uppercase | translate }}</mat-label>
          <input matInput type="email" [placeholder]="'Adres e-mail' | uppercase | translate" formControlName="email" />
          <mat-error *ngIf="errorMessage('email') as message">{{ message | uppercase | translate  }}</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>{{ 'Powtórz adres e-mail' | uppercase | translate }}</mat-label>
          <input matInput type="email" [placeholder]="'Powtórz adres e-mail' | uppercase | translate" formControlName="emailRepeat" />
          <mat-error *ngIf="errorMessage('emailRepeat') as message">{{ message }}</mat-error>
        </mat-form-field>
        <mat-slide-toggle [checked]="toggleValue" (change)="toggleValue = !toggleValue" color="accent" formControlName="newsletter">
          {{ 'Zgoda na otrzymywanie newslettera' | uppercase | translate }}
        </mat-slide-toggle>
        <app-promo-code (promoCode)="promoCodeHandler($event)" [isPromoCodeApplied]="isPromoCodeApplied"></app-promo-code>
        <div class="button-wrapper">
          <button mat-stroked-button color="warn" matStepperPrevious>{{ 'Wróć' | uppercase | translate }}</button>
          <button type="submit" mat-raised-button color="primary" matStepperNext [disabled]="contactForm.invalid">
            {{ 'Dalej' | uppercase | translate }}
          </button>
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
      
      mat-error {
        font-size: 14px;
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
    this.userData$.subscribe((userData) => {
      if (userData.isUserLoggedIn) {
        this.contactForm.patchValue({
          userId: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          emailRepeat: userData.email,
          newsletter: userData.newsletter
        })

        if (userData.newsletter) {
          this.contactForm.get('newsletter')?.disable()
        }
      }
    })
  }

  errorMessage(formControlName: 'firstName' | 'lastName' | 'phoneNumber' | 'email' | 'emailRepeat') {
    return getErrorMessage(formControlName, this.contactForm)
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

    console.log(this.contactForm.getRawValue())

    this.totalPrice$.pipe(take(1)).subscribe((price) => {
      this.reservationStore.addTotalPrice(price)
    })

    this.reservationStore.addContactData(this.contactForm.getRawValue())
  }

  private createContactForm() {
    return this.formBuilder.group({
      userId: 0,
      firstName: this.formBuilder.control('', [Validators.required, whitespaceValidator, Validators.maxLength(50), Validators.minLength(2), allowOnlyLettersValidator]),
      lastName: this.formBuilder.control('', [Validators.required, whitespaceValidator, Validators.maxLength(50), Validators.minLength(2), allowOnlyLettersValidator]),
      phoneNumber: this.formBuilder.control('', [Validators.required, whitespaceValidator, Validators.minLength(9), Validators.maxLength(9), allowOnlyNumbersValidator]),
      email: this.formBuilder.control('', [Validators.required, emailValidator, whitespaceValidator, Validators.maxLength(50), Validators.minLength(6)]),
      emailRepeat: this.formBuilder.control('', [Validators.required, emailValidator, whitespaceValidator, Validators.maxLength(50), Validators.minLength(6)]),
      newsletter: this.formBuilder.control(false),
      discountCode: this.formBuilder.control(''),
    })
  }
}
