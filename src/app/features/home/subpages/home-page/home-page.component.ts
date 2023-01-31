import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Location } from '@angular/common'
import { Store } from '@ngrx/store'

import { DatePickerComponent } from 'src/app/features/home/subpages/home-page/dates/date-picker'
import { MovieCardComponent } from '@shared/ui/movie-card/movie-card.component'
import { selectShowings } from 'src/app/features/home/store/home.selectors'
import { ShowingsActions } from 'src/app/features/home/store/home.actions'

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss'],
  imports: [
    DatePickerComponent,
    MovieCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  private location = inject(Location)
  private store = inject(Store)

  showings$ = this.store.select(selectShowings)
  handleSelectedDay(selectedDay: string) {
    this.location.replaceState('/', `date=${selectedDay}`)
  }

  handleSelectedDate(selectedDate: string) {
    this.store.dispatch(ShowingsActions.getShowings(
      {
        date: selectedDate,
        filters: 'day',
        hall_id: 1
      }
    ))

    this.showings$.subscribe((s) => console.log(s))
  }
}
