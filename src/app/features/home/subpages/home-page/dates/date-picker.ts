import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core'
import { eachDayOfInterval, endOfISOWeek, format, parse, startOfISOWeek } from 'date-fns'
import { NgClass, NgForOf } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-date-picker',
  standalone: true,
  template: `
    <ul>
      <li *ngFor="let day of days">
        <button [ngClass]="{ 'selected': day === selectedDate }" mat-button [disabled]="checkIfDateIsPast(day)" (click)="selectDate(day)">{{ day }}</button>
      </li>
    </ul>

  `,
  styles: [`
    ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
    }
    
    button {
      background-color: var(--secondaryDark);
      color: white;
      padding: 10px;
      margin: 10px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .selected {
      background-color: var(--primary);
    }
  `],
  imports: [
    NgForOf,
    NgClass,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  @Output() dateSelected = new EventEmitter<string>();
  @Output() daySelected = new EventEmitter<string>();
  dates = eachDayOfInterval({
    start: startOfISOWeek(new Date()),
    end: endOfISOWeek(new Date()),
  }).map((day) => format(day, 'yyyy-MM-dd'));

  get days() {
    return this.dates.map((date) => format(parse(date, 'yyyy-MM-dd', new Date()), 'dd/MM'));
  }
  currentDay = format(new Date(), 'dd/MM');
  selectedDate = this.currentDay;

  selectDate(day: string) {
    this.selectedDate = day;
    this.daySelected.emit(day);
    this.dateSelected.emit(this.dates[this.days.indexOf(day)]);
  }

  checkIfDateIsPast(day: string) {
    return this.days.indexOf(day) < this.days.indexOf(this.currentDay);
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.days.includes(params['date'])) {
        this.selectedDate = params['date'];
        this.dateSelected.emit(this.dates[this.days.indexOf(params['date'])]);
      } else {
        this.router.navigate(['/404'], { replaceUrl: true })
      }

      if (!params['date']) {
        this.dateSelected.emit(format(new Date(), 'yyyy-MM-dd'));
      }
    })
  }
}
