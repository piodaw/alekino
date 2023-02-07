import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { AdminDatePickerComponent } from '@shared/ui/admin-date-picker/admin-date-picker.component'
import { AdminRepertoireStore } from 'src/app/features/admin/subpages/repertoire/store/admin-repertoire.store'
import { AsyncPipe, JsonPipe } from '@angular/common'
import { RepertoireComponent } from '@shared/ui/repertoire/repertoire.component'
import { format } from 'date-fns'

@Component({
  selector: 'app-admin-repertoire',
  standalone: true,
  templateUrl: 'admin-repertoire.component.html',
  styleUrls: ['admin-repertoire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminRepertoireStore],
  imports: [
    AdminDatePickerComponent,
    AsyncPipe,
    JsonPipe,
    RepertoireComponent
  ]
})
export class AdminRepertoireComponent {
  private adminRepertoireStore = inject(AdminRepertoireStore)

  readonly movies$ = this.adminRepertoireStore.select(state => state.movies)
  readonly halls$ = this.adminRepertoireStore.select(state => state.halls)
  readonly selectedDate$ = this.adminRepertoireStore.select(state => state.selectedDate)
  readonly showings$ = this.adminRepertoireStore.select(state => state.showings)

  ngOnInit() {
    this.getShowings()
  }

  dateHandler(date: string) {
    this.adminRepertoireStore.updateSelectedDate(date)
    this.getShowings()
  }

  createNewShowing({ hour, hall_id, movie_id }: { hour: string, hall_id: number, movie_id: number }) {
    this.selectedDate$.subscribe(date => {
      const start = `${format(new Date(date), 'yyyy-dd-MM')} ${hour}`
      console.log(start)
      this.adminRepertoireStore.createShowing({ start, hall_id, movie_id })
    }).unsubscribe()
  }

  private getShowings() {
    this.adminRepertoireStore.getShowings(this.selectedDate$)
  }
}
