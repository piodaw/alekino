import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { NgClass, NgForOf } from '@angular/common'
import { addDays, format } from 'date-fns'

@Component({
  selector: 'app-admin-date-picker',
  standalone: true,
  template: `
    <div class="dates-wrapper">
      <button
              *ngFor="let date of dates"
              class="dates"
              [ngClass]="{ 'selected': date === selectedDate }"
              (click)="dayHandler(date)"
      >
        <div class="date">
          {{ date.split("-")[0] }} - {{ date.split("-")[1] }}
        </div>
        <div class="year">{{ date.split("-")[2] }}</div>
      </button>
    </div>
  `,
  styles: [`
    .dates-wrapper {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      height: calc(100vh - var(--header-height));
    }

    .dates {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 20px;
      background-color: var(--info);
      border-bottom: 1px solid var(--text-secondary);
      color: #FFF;
      font-size: 18px;
    }

    button {
      width: 100%;
      height: 100%;
      border: none;
      background: none;
      outline: none;
      cursor: pointer;
    }

    button:hover {
      background-color: rgba(178, 100, 138, 0.8);
      transform: scale(1.05);
      transition: all 0.3s ease-in-out;
    }

    .selected {
      background-color: rgba(178, 100, 138, 0.8);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    NgClass
  ],
})
export class AdminDatePickerComponent {
  @Output() clickedDate = new EventEmitter<string>()
  dates = Array(14)
    .fill(0)
    .map((x, i) => format(addDays(new Date(), i), 'dd-MM-yyyy'));
  currentDay = format(new Date(), 'dd-MM-yyyy');
  selectedDate = this.currentDay;

  ngOnInit() {
    this.clickedDate.emit(this.selectedDate)
  }

  dayHandler(date: string) {
    this.clickedDate.emit(date)
    this.selectedDate = date;
  }
}
