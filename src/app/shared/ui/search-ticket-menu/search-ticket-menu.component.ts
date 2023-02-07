import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

import { Routing } from '@shared/routes/routing';
import { MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { emailValidator, whitespaceValidator } from '@shared/validators/form.validators'

@Component({
  selector: 'app-search-ticket-menu',
  standalone: true,
  template: `
    <div (click)="$event.stopPropagation()">
      <form [formGroup]="searchForm" (ngSubmit)="searchTicket()">
        <mat-form-field color="accent">
          <mat-label>Numer biletu</mat-label>
          <input matInput type="text" placeholder="Wpisz numer biletu" formControlName="ticketNumber" />
          <mat-error></mat-error>
        </mat-form-field>
        <mat-form-field color="accent">
          <mat-label>E-mail</mat-label>
          <input matInput type="email" placeholder="Wpisz adres email" formControlName="email" />
          <mat-error></mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary">Szukaj</button>
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
    ReactiveFormsModule
  ]
})
export class SearchTicketMenuComponent {
  @Output() ticketData = new EventEmitter()
  private formBuilder = inject(NonNullableFormBuilder)

  routing = Routing;

  searchForm = this.searchTicketForm();

  searchTicket() {
    this.searchForm.markAllAsTouched();

    if (this.searchForm.invalid) {
      return;
    }

    this.ticketData.emit(this.searchForm.getRawValue());
  }

  private searchTicketForm() {
    return this.formBuilder.group({
      ticketNumber: this.formBuilder.control('', [Validators.required, Validators.minLength(3), whitespaceValidator]),
      email: this.formBuilder.control('', [Validators.required, whitespaceValidator, emailValidator])
    })
  }
}
