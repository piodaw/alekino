import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common'

import { Routing } from '@shared/routes/routing';
import { MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { allowOnlyNumbersValidator, emailValidator, whitespaceValidator } from '@shared/validators/form.validators'
import { TranslateModule } from '@ngx-translate/core'
import { getErrorMessage } from '@shared/form-errors/form.errors'

@Component({
  selector: 'app-search-ticket-menu',
  standalone: true,
  template: `
    <div (click)="$event.stopPropagation()">
      <form [formGroup]="searchForm" (ngSubmit)="searchTicket()">
        <mat-form-field color="accent">
          <mat-label>{{'Numer biletu' | uppercase | translate}}</mat-label>
          <input matInput type="text" [placeholder]="'Wpisz numer biletu' | uppercase | translate" formControlName="ticketNumber" />
          <mat-error *ngIf="errorMessage('ticketNumber') as message">{{ message | uppercase | translate }}</mat-error>
        </mat-form-field>
        <mat-form-field color="accent">
          <mat-label>{{ 'E-mail' | uppercase | translate}}</mat-label>
          <input matInput type="email" [placeholder]="'Wpisz adres email' | uppercase | translate" formControlName="email" />
          <mat-error *ngIf="errorMessage('email') as message">{{ message | uppercase | translate }}</mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary">{{ 'Szukaj' | uppercase | translate}}</button>
      </form>
    </div>
  `,
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px;
      }
      
      mat-error {
        font-size: 14px;
      }
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
    MatInputModule,
    ReactiveFormsModule,
    UpperCasePipe,
    TranslateModule
  ]
})
export class SearchTicketMenuComponent {
  @Output() ticketData = new EventEmitter()
  private formBuilder = inject(NonNullableFormBuilder)

  routing = Routing;

  searchForm = this.searchTicketForm();

  errorMessage(formControlName: 'ticketNumber' | 'email') {
    return getErrorMessage(formControlName, this.searchForm)
  }

  searchTicket() {
    this.searchForm.markAllAsTouched();

    if (this.searchForm.invalid) {
      return;
    }

    this.ticketData.emit(this.searchForm.getRawValue());
  }

  private searchTicketForm() {
    return this.formBuilder.group({
      ticketNumber: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), whitespaceValidator, allowOnlyNumbersValidator]),
      email: this.formBuilder.control('', [Validators.required, Validators.maxLength(100), whitespaceValidator, emailValidator])
    })
  }
}
