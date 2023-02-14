import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  TableWithPaginatorAndFilterComponent
} from '@shared/ui/tableWithPaginatorAndFilters/tableWithPaginatorAndFilters.component'
import { AdminMoviesStore } from 'src/app/features/admin/subpages/movies/store/admin-movies.store'
import { MatButtonModule } from '@angular/material/button'
import { Observable } from 'rxjs'
import { Movie } from 'src/app/features/admin/shared/admin.interfaces'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MovieFormDialogComponent } from '@shared/ui/movie-form-dialog/movie-form-dialog.component'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-admin-movies',
  standalone: true,
  templateUrl: 'admin-movies.component.html',
  styleUrls: ['admin-movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableWithPaginatorAndFilterComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [AdminMoviesStore]
})
export class AdminMoviesComponent {
  private adminMoviesStore = inject(AdminMoviesStore)
  private dialog = inject(MatDialog)

  readonly movies$ = this.adminMoviesStore.select((state) => state.movies)
  readonly movie$ = this.adminMoviesStore.select((state) => state.movie)
  displayedColumns = ['id', 'title', 'duration', 'genre', 'ispremiere', 'actions'];

  editHandler(id: number) {
    this.adminMoviesStore.getMovieById(id)

    this.openDialog(true, this.movie$)
  }

  deleteHandler(id: number) {
    this.adminMoviesStore.deleteMovie(id)
  }

  addNewMovie() {
    this.openDialog(false)
  }

  private openDialog(isEdit: boolean, data?: Observable<Movie>) {
    const dialogRef = this.dialog.open(MovieFormDialogComponent, {
      data: { movie$: data, isEdit }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return

      if (isEdit) {
        this.adminMoviesStore.updateMovie(result)
      } else {
        this.adminMoviesStore.createMovie(result)
      }
    })
  }
}
