import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  TableWithPaginatorAndFilterComponent
} from '@shared/ui/tableWithPaginatorAndFilters/tableWithPaginatorAndFilters.component'
import { AdminUserStore } from 'src/app/features/admin/subpages/users/store/admin-users.store'

@Component({
  selector: 'app-admin-users',
  standalone: true,
  templateUrl: 'admin-users.component.html',
  styleUrls: ['admin-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableWithPaginatorAndFilterComponent
  ],
  providers: [AdminUserStore]
})
export class AdminUsersComponent {
  private adminUserStore = inject(AdminUserStore)

  displayedColumns = ['id', 'firstname', 'lastname','email', 'role']

  readonly users$ = this.adminUserStore.select((state) => state.users)
}
