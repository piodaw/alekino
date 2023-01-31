import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core'
import { eachDayOfInterval, endOfISOWeek, format, parse, startOfISOWeek } from 'date-fns'
import { NgClass, NgForOf } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-date-picker',
  standalone: true,
  template: `
    <ul>
      <li [ngClass]="{ 'selected': day === selectedDate }" *ngFor="let day of days" (click)="selectDate(day)">{{ day }}</li>
    </ul>

  `,
  styles: [`
    ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
    }
    
    li {
      background-color: var(--secondaryDark);
      color: white;
      padding: 10px;
      margin: 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    
    .selected {
      background-color: var(--primary);
    }
  `],
  imports: [
    NgForOf,
    NgClass
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

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.days.includes(params['date'])) {
        this.selectedDate = params['date'];
      } else {
        this.router.navigate(['/404'], { replaceUrl: true })
      }
    })

    this.dateSelected.emit(format(new Date(), 'yyyy-MM-dd'));
  }
}
