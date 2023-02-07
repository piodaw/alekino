import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'

import {
  TableWithPaginatorAndFilterComponent
} from '@shared/ui/tableWithPaginatorAndFilters/tableWithPaginatorAndFilters.component'
import { MyTicketsStore } from 'src/app/features/home/subpages/my-tickets/store/my-tickets.store'
import { Store } from '@ngrx/store'
import { selectLoggedUser } from '@core/store/user.selectors'
import { UserTicketDialogComponent } from '@shared/ui/user-ticket-dialog/user-ticket-dialog.component'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  template: `
    <main>
      <app-table-paginator-filters 
        [data$]="tickets$" 
        [displayedColumns]="displayedColumns"
        (userTicket)="userTicketHandler($event)"
      ></app-table-paginator-filters>
    </main>
  `,
  styles: [`
    main {
      min-height: calc(100vh - var(--headerAndFooter-height));
      margin-top: var(--header-height);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableWithPaginatorAndFilterComponent,
    MatDialogModule
  ],
  providers: [MyTicketsStore]
})
export class MyTicketsComponent implements OnInit {
  private myTicketsStore = inject(MyTicketsStore)
  private store = inject(Store)
  private dialog = inject(MatDialog)

  tickets$ = this.myTicketsStore.select((state) => state.tickets)
  ticket$ = this.myTicketsStore.select((state) => state.ticket)
  loggedUser$ = this.store.select(selectLoggedUser)

  displayedColumns = ['ticketno', 'title', 'hallno', 'seats', 'start', 'userActions'];

  ngOnInit() {
    this.myTicketsStore.getMyTickets(this.loggedUser$)
  }

  userTicketHandler(ticketNo: number) {
    this.myTicketsStore.findTicket(ticketNo)

    this.openTicketDialog()
  }

  private openTicketDialog() {
    const dialogRef = this.dialog.open(UserTicketDialogComponent, {
      data: {ticket$: this.ticket$}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return

      if (result.refund) {
        this.myTicketsStore.refundTicket(result.ticketNo)
      }
    })
  }
}
