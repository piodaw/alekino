import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AsyncPipe, JsonPipe } from '@angular/common'
import { Observable } from 'rxjs'

import { AdminHallsStore } from 'src/app/features/admin/subpages/halls/store/admin-halls.store'
import { HallCardComponent } from '@shared/ui/hall-card/hall-card.component'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { UpdateHallDialogComponent } from '@shared/ui/update-hall-dialog/update-hall-dialog.component'

@Component({
  selector: 'app-admin-halls',
  standalone: true,
  templateUrl: 'admin-halls.component.html',
  styleUrls: ['admin-halls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminHallsStore],
  imports: [
    HallCardComponent,
    AsyncPipe,
    JsonPipe,
    MatDialogModule
  ]
})
export class AdminHallsComponent {
  private adminHallsStore = inject(AdminHallsStore)
  private dialog = inject(MatDialog)

  readonly halls$ = this.adminHallsStore.select(state => state.halls)
  readonly hall$ = this.adminHallsStore.select(state => state.hall)

  createNewHallHandler() {
    this.adminHallsStore.createHall()
  }

  updateHallHandler(hall_id: Observable<number>) {
    this.adminHallsStore.getHallById(hall_id)

    this.openDialog()
  }

  private openDialog() {
    const dialogRef = this.dialog.open(UpdateHallDialogComponent, {
      data: { hall$: this.hall$ }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return

      if (result.delete) {
        this.adminHallsStore.deleteHall(result.delete)
      }

      this.adminHallsStore.updateHallById(result)
    });
  }
}
