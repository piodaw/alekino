import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { StepperComponent } from '@shared/ui/stepper/stepper.component';
import { ReservationActions, ShowingsActions } from '../../store/home.actions'
import { selectShowingAndMovie, selectTickets } from '../../store/home.selectors'

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    StepperComponent
  ],
  templateUrl: 'reservations.component.html',
  styleUrls: ['reservations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationsComponent implements OnInit {
  private store = inject(Store)
  private activeRoute = inject(ActivatedRoute);

  showing$ = this.store.select(selectShowingAndMovie)
  tickets$ = this.store.select(selectTickets)

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.store.dispatch(ShowingsActions.getShowing({ showingId: +params['id'] }))
    })

    this.store.dispatch(ReservationActions.getTickets())
  }

  addToBookedSeats({ showingId, seat }: { showingId: number, seat: string }) {
    this.store.dispatch(ShowingsActions.updateShowingBookedSeats({showingId, seat }))
  }
}
