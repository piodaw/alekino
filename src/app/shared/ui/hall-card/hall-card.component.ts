import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AsyncPipe, JsonPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common'

import { Hall } from 'src/app/features/admin/shared/admin.interfaces'
import { MatButtonModule } from '@angular/material/button'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-hall-card',
  standalone: true,
  templateUrl: 'hall-card.component.html',
  styleUrls: ['hall-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgIf,
    NgForOf,
    MatButtonModule,
    UpperCasePipe,
    TranslateModule
  ]
})
export class HallCardComponent {
  @Input() halls$!: Observable<Hall[]>
  @Output() createNewHall = new EventEmitter()
  @Output() update = new EventEmitter<Observable<number>>()

  createHall() {
    this.createNewHall.emit()
  }

  updateHall(hall_id: number) {
    this.update.emit(of(hall_id))
  }
}
