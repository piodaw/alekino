import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AdminPromoCodesStore } from 'src/app/features/admin/subpages/promo-codes/store/admin-promo-codes.store'
import {
  TableWithPaginatorAndFilterComponent
} from '@shared/ui/tableWithPaginatorAndFilters/tableWithPaginatorAndFilters.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { AdminPromoCodeMenuComponent } from '@shared/ui/admin-promo-code-menu/admin-promo-code-menu.component'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { PromoCodeDialogComponent } from '@shared/ui/promo-code-dialog/promo-code-dialog.component'
import { of } from 'rxjs'

@Component({
  selector: 'app-admin-promo-codes',
  standalone: true,
  templateUrl: 'admin-promo-codes.component.html',
  styleUrls: ['admin-promo-codes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableWithPaginatorAndFilterComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    AdminPromoCodeMenuComponent,
    MatDialogModule
  ],
  providers: [AdminPromoCodesStore]
})
export class AdminPromoCodesComponent {
  private adminPromoCodesStore = inject(AdminPromoCodesStore)
  private dialog = inject(MatDialog)

  promoCodes$ = this.adminPromoCodesStore.select((state) => state.promoCodes)
  code$ = this.adminPromoCodesStore.select((state) => state.promoCode)
  columnsToDisplay = ['id', 'promo_code', 'value', 'actions'];

  promocodeHandler(data: { code: string; discount: number }) {
    this.adminPromoCodesStore.createPromoCode(data)
  }

  deletePromoCode(id: number) {
    this.adminPromoCodesStore.deletePromoCode(id)
  }

  editPromoCode(id: number) {
    this.adminPromoCodesStore.getPromoCode(id)

    this.openDialog(id)
  }

  private openDialog(id: number) {
    const dialogRef = this.dialog.open(PromoCodeDialogComponent, {
      data: { code$: this.code$ }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return

      this.adminPromoCodesStore.updatePromoCode(of({ id, ...result }))
    });
  }
}
