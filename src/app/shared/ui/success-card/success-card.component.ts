import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Ticket } from 'src/app/features/home/subpages/success/store/success.store'
import { Observable } from 'rxjs'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { QRCodeModule } from 'angularx-qrcode'
import { MatDividerModule } from '@angular/material/divider'

@Component({
  selector: 'app-success-card',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    QRCodeModule,
    MatDividerModule
  ],
  template: `
    <div class="ticket-wrapper" *ngIf="ticket$ | async as ticket">
      <div>
        <h1>{{ ticket.title }}</h1>
      </div>
      <div>
        <p>{{ ticket.start }} | Sala {{ ticket.hallno }}</p>
      </div>
      <div>
        <qrcode [qrdata]="'https://twojbilet.pl'" [width]="256" [colorLight]="'#17082AFF'" [colorDark]="'#FF8FC6'"></qrcode>
      </div>
      <div class="total-price-wrapper">
        <span class="total-price-title">Podsumowanie:</span>
        <mat-divider></mat-divider>
        <div class="seat-wrapper">
          <div class="seat" *ngFor="let seat of ticket.seats">
            <p>miejsce {{ seat.split('').join('-') }}</p>
          </div>
        </div>
        <div class="price">
          <p>Razem:</p>
          <p>{{ ticket.totalprice.toFixed(2) }} zł</p>
        </div>
      </div>
      <div class="email-info">
        <span>*Bilet został wysłany na podany email: {{ ticket.email }}</span>
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
      
      .email-info {
        margin: 12px 0;
        font-size: 12px;
        width: 300px;
        text-align: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessCardComponent {
  @Input() ticket$!: Observable<Ticket>
}
