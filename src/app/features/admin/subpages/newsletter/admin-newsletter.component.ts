import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import {
  TableWithPaginatorAndFilterComponent
} from '@shared/ui/tableWithPaginatorAndFilters/tableWithPaginatorAndFilters.component'
import { AdminNewsletterStore } from 'src/app/features/admin/subpages/newsletter/store/admin-newsletter.store'

@Component({
  selector: 'app-admin-newsletter',
  standalone: true,
  templateUrl: 'admin-newsletter.component.html',
  styleUrls: ['admin-newsletter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableWithPaginatorAndFilterComponent
  ],
  providers: [AdminNewsletterStore]
})
export class AdminNewsletterComponent {
  private adminNewsletterStore = inject(AdminNewsletterStore)

  newsletter$ = this.adminNewsletterStore.select((state) => state.newsletter)

  displayedColumns = ['newsletter_id', 'email', 'actions'];
}
