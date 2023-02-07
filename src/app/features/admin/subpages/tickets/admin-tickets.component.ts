import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  TableWithPaginatorAndFilterComponent
} from '@shared/ui/tableWithPaginatorAndFilters/tableWithPaginatorAndFilters.component'
import { AdminTicketsStore } from 'src/app/features/admin/subpages/tickets/store/admin-tickets.store'

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  templateUrl: 'admin-tickets.component.html',
  styleUrls: ['admin-tickets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableWithPaginatorAndFilterComponent
  ],
  providers: [AdminTicketsStore]
})
export class AdminTicketsComponent {
  private adminTicketsStore = inject(AdminTicketsStore)

  readonly reservations$ = this.adminTicketsStore.select((state) => state.reservations)

  displayedColumns = ['ticket_no', 'title', 'start', 'seats', 'email'];
}
