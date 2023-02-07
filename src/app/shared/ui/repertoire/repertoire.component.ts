import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common'
import { combineLatest, map, Observable } from 'rxjs'
import { MatIconModule } from '@angular/material/icon'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

import { hours } from '@shared/ui/repertoire/constants/hours'
import { Hall, Movie, Showing } from 'src/app/features/admin/shared/admin.interceptors'
import { RepertoireDialogComponent } from '@shared/ui/repertoire-dialog/repertoire-dialog.component'
import { isAfter, isToday, parse } from 'date-fns'

@Component({
  selector: 'app-repertoire',
  standalone: true,
  templateUrl: `repertoire.component.html`,
  styleUrls: [`repertoire.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    NgClass,
    AsyncPipe,
    NgIf,
    MatIconModule,
    RepertoireDialogComponent,
    MatDialogModule
  ],
})
export class RepertoireComponent {
  @Input() movies$!: Observable<Movie[]>
  @Input() halls$!: Observable<Hall[]>
  @Input() showings$!: Observable<Showing[]>
  @Input() selectedDate$!: Observable<string>
  @Output() newShowingData = new EventEmitter<{ hour: string, hall_id: number, movie_id: number }>()

  private dialog = inject(MatDialog)

  hours = hours

  isHourAvailable(hour: string, hall_id: number) {
    return combineLatest([this.showings$, this.selectedDate$]).pipe(
      map(([showings, selectedDate]) => {
        const isHourAvailable = showings.some(
          showing => showing.middlehours.includes(hour) && showing.hallid === hall_id
        )
        let isTodayHourIsPast = true

        if (isToday(parse(selectedDate, 'dd-MM-yyyy', new Date()))) {
          isTodayHourIsPast = isAfter(parse(hour, 'HH:mm', new Date()), new Date())
        }
        return isHourAvailable || !isTodayHourIsPast
      }),
    );
  }

  addToRepertoire(hour: string, hall_id: number) {
    this.openDialog(hour, hall_id)
  }

  private openDialog(hour: string, hall_id: number) {
    const dialogRef = this.dialog.open(RepertoireDialogComponent, {
      data: { movies$: this.movies$ }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return

      this.newShowingData.emit({
        hour,
        hall_id,
        movie_id: result.movieId
      })
    });
  }
}
