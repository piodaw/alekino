import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AdminPromoCodesStore } from 'src/app/features/admin/subpages/promo-codes/store/admin-promo-codes.store'
import {
  TableWithPaginatorAndFilterComponent
} from '@shared/ui/tableWithPaginatorAndFilters/tableWithPaginatorAndFilters.component'

@Component({
  selector: 'app-admin-promo-codes',
  standalone: true,
  templateUrl: 'admin-promo-codes.component.html',
  styleUrls: ['admin-promo-codes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableWithPaginatorAndFilterComponent
  ],
  providers: [AdminPromoCodesStore]
})
export class AdminPromoCodesComponent {
  private adminPromoCodesStore = inject(AdminPromoCodesStore)

  promoCodes$ = this.adminPromoCodesStore.select((state) => state.promoCodes)
  columnsToDisplay = ['promo_id', 'promo_code', 'value', 'actions'];
}
