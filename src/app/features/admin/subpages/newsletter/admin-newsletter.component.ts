import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { of } from 'rxjs'

import {
  TableWithPaginatorAndFilterComponent
} from '@shared/ui/tableWithPaginatorAndFilters/tableWithPaginatorAndFilters.component'
import { AdminNewsletterStore } from 'src/app/features/admin/subpages/newsletter/store/admin-newsletter.store'
import { EditNewsletterDialogComponent } from '@shared/ui/edit-newsletter-dialog/edit-newsletter-dialog.component'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

@Component({
  selector: 'app-admin-newsletter',
  standalone: true,
  templateUrl: 'admin-newsletter.component.html',
  styleUrls: ['admin-newsletter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableWithPaginatorAndFilterComponent,
    EditNewsletterDialogComponent,
    MatDialogModule
  ],
  providers: [AdminNewsletterStore]
})
export class AdminNewsletterComponent {
  private adminNewsletterStore = inject(AdminNewsletterStore)
  private dialog = inject(MatDialog)

  newsletter$ = this.adminNewsletterStore.select((state) => state.newsletter)
  newsletterDetails$ = this.adminNewsletterStore.select((state) => state.newsletterDetails)

  displayedColumns = ['id', 'email', 'actions'];

  editHandler(id: number) {
    this.adminNewsletterStore.getNewsletterById(id)

    this.openEditDialog(id)
  }

  deleteHandler(id: number) {
    this.adminNewsletterStore.removeNewsletter(id)
  }

  private openEditDialog(id: number) {
    const dialogRef = this.dialog.open(EditNewsletterDialogComponent, {
      data: { newsletter$: this.newsletterDetails$ }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return

      this.adminNewsletterStore.updateNewsletter(of({ id, ...result }))
    })
  }
}
