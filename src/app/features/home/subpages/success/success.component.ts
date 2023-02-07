import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs'
import { AsyncPipe, JsonPipe } from '@angular/common'

import { SuccessStore } from 'src/app/features/home/subpages/success/store/success.store'
import { SuccessCardComponent } from '@shared/ui/success-card/success-card.component'

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    SuccessCardComponent
  ],
  templateUrl: 'success.component.html',
  styleUrls: ['success.component.scss'],
  providers: [SuccessStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute)
  private successStore = inject(SuccessStore)

  ticket$ = this.successStore.state$.pipe(map((state) => state.ticket))

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.successStore.getTicket(params['id'])
    })
  }
}
