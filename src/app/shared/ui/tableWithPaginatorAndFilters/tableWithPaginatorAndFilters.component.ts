import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Observable } from 'rxjs'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { NgForOf, NgIf, UpperCasePipe } from '@angular/common'
import { Movie, Newsletter, PromoCode, Reservation, User } from 'src/app/features/admin/shared/admin.interfaces'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Tickets } from 'src/app/features/home/subpages/my-tickets/store/my-tickets.store'
import { MatMenuModule } from '@angular/material/menu'
import { AdminPromoCodeMenuComponent } from '@shared/ui/admin-promo-code-menu/admin-promo-code-menu.component'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-table-paginator-filters',
  standalone: true,
  styleUrls: ['tableWithPaginatorAndFilters.component.scss'],
  templateUrl: 'tableWithPaginatorAndFilters.component.html',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    NgForOf,
    MatButtonModule,
    MatIconModule,
    NgIf,
    MatMenuModule,
    AdminPromoCodeMenuComponent,
    UpperCasePipe,
    TranslateModule
  ]
})
export class TableWithPaginatorAndFilterComponent implements AfterViewInit, OnInit {
  @Input() displayedColumns: string[] = []
  @Input() data$!: Observable<User[] | Reservation[] | PromoCode[] | Movie[] | Newsletter[] | Tickets[]>
  @Input() isAddButtonVisible = false
  @Output() userTicket = new EventEmitter<number>()
  @Output() deleteId = new EventEmitter<number>()
  @Output() editId = new EventEmitter<number>()
  dataSource = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.data$.subscribe((data) => {
      this.dataSource.data = data
    })
  }

  editButton(id: number) {
    this.editId.emit(id)
  }

  deleteButton(id: number) {
    this.deleteId.emit(id)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  seeTicket(ticketNo: number) {
    this.userTicket.emit(ticketNo)
  }

  headingHandler(column: string) {
    if (column === 'id') return 'ID'
    if (column === 'firstname') return 'Imię'
    if (column === 'lastname') return 'Nazwisko'
    if (column === 'email') return 'Adres e-mail'
    if (column === 'role') return 'Rola'
    if (column === 'ticket_no') return 'Numer biletu'
    if (column === 'title') return 'Tytuł'
    if (column === 'start') return 'Data rozpoczęcia'
    if (column === 'seats') return 'Miejsca'
    if (column === 'promo_code') return 'Kod rabatowy'
    if (column === 'value') return 'Wartość (%)'
    if (column === 'duration') return 'Czas trwania (w min.)'
    if (column === 'genre') return 'Gatunek'
    if (column === 'ispremiere') return 'Premiera'
    if (column === 'ticketno') return 'Numer biletu'
    if (column === 'hallno') return 'Numer sali'

    return ''
  }
}
