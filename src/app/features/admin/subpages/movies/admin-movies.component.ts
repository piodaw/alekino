import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  TableWithPaginatorAndFilterComponent
} from '@shared/ui/tableWithPaginatorAndFilters/tableWithPaginatorAndFilters.component'
import { AdminMoviesStore } from 'src/app/features/admin/subpages/movies/store/admin-movies.store'

@Component({
  selector: 'app-admin-movies',
  standalone: true,
  templateUrl: 'admin-movies.component.html',
  styleUrls: ['admin-movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableWithPaginatorAndFilterComponent
  ],
  providers: [AdminMoviesStore]
})
export class AdminMoviesComponent {
  private adminMoviesStore = inject(AdminMoviesStore)

  readonly movies$ = this.adminMoviesStore.select((state) => state.movies)
  displayedColumns = ['id', 'title', 'duration', 'genre', 'rating', 'ispremiere', 'actions'];
}
