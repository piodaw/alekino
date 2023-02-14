import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { SuccessCardComponent } from '@shared/ui/success-card/success-card.component';
import { Ticket } from 'src/app/features/home/subpages/success/store/success.store';
import { QRCodeModule } from 'angularx-qrcode';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core'

export interface DialogData {
  ticket$: Observable<Ticket>;
}

@Component({
  selector: 'app-user-ticket-dialog',
  standalone: true,
  template: `
    <h1 mat-dialog-title>{{ 'Twój bilet' | uppercase | translate }}</h1>
    <div class="dialog-wrapper" *ngIf="data.ticket$ | async as ticket">
      <div mat-dialog-content>
        <div class="ticket-wrapper">
          <div class="h1-wrapper">
            <h1>{{ ticket.title }}</h1>
          </div>
          <div>
            <p>{{ ticket.start }} | {{ 'Sala' | uppercase | translate }} {{ ticket.hallno }}</p>
          </div>
          <div>
            <qrcode
              [qrdata]="'https://twojbilet.pl'"
              [width]="256"
              [colorLight]="'#17082AFF'"
              [colorDark]="'#FF8FC6'"></qrcode>
          </div>
          <div class="total-price-wrapper">
            <span class="total-price-title">{{ 'Podsumowanie' | uppercase | translate }}:</span>
            <mat-divider></mat-divider>
            <div class="seat-wrapper">
              <div class="seat" *ngFor="let seat of ticket.seats">
                <p>{{ 'miejsce' | uppercase | translate }} {{ seat.split('')[0] }}-{{ seat.slice(1,3) }}</p>
              </div>
            </div>
            <div class="price">
              <p>{{ 'Razem' | uppercase | translate}}:</p>
              <p>{{ ticket.totalprice.toFixed(2) }} zł</p>
            </div>
          </div>
          <div class="button-wrapper" mat-dialog-actions>
            <button mat-stroked-button color="warn" type="button" (click)="onNoClick()">{{ 'Anuluj' | uppercase | translate }}</button>
            <button mat-raised-button color="accent" type="submit" (click)="refund(ticket.ticketno)">{{ 'Zwróć' | uppercase | translate }}</button>
            <button mat-raised-button color="primary" type="submit" (click)="onNoClick()">{{ 'Potwierdź' | uppercase | translate}}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .ticket-wrapper {
        width: 400px;
        height: 520px;
        background-color: var(--surface);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        box-shadow: 0 0 10px 0 rgb(255, 143, 198);
      }

      .h1-wrapper {
        margin: 24px 0 8px 0;
      }

      .total-price-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .total-price-title {
        width: 300px;
        margin-bottom: 6px;
        color: var(--text-secondary);
      }

      .mat-mdc-dialog-content {
        max-height: 75vh;
        overflow-x: hidden;
      }

      mat-divider {
        width: 324px;
        border-top-color: rgba(255, 255, 255, 0.5);
      }

      .seat-wrapper {
        max-height: 80px;
        overflow: auto;
      }

      .seat {
        width: 300px;
        margin: 12px 0;
        font-weight: 600;
      }

      .price {
        display: flex;
        justify-content: space-between;
        width: 300px;
        background-color: var(--primary);
        padding: 12px;
        border-radius: 8px;
        text-transform: uppercase;
        font-weight: 600;
      }

      .button-wrapper {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        margin: 24px;
      }

      button {
        width: 90px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    MatDialogModule,
    MatButtonModule,
    NgIf,
    AsyncPipe,
    SuccessCardComponent,
    QRCodeModule,
    MatListModule,
    JsonPipe,
    UpperCasePipe,
    TranslateModule
  ]
})
export class UserTicketDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  private dialogRef = inject(MatDialogRef);

  onNoClick() {
    this.dialogRef.close();
  }

  refund(ticketNo: number) {
    this.dialogRef.close({
      refund: true,
      ticketNo,
    });
  }

  submit() {
    this.dialogRef.close();
  }
}
