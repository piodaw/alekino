import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { StepperComponent } from '@shared/ui/stepper/stepper.component';
import { ShowingsActions } from '../../store/home.actions';
import { selectShowingAndMovie } from '../../store/home.selectors';

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

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.store.dispatch(ShowingsActions.getShowing({ showingId: +params['id'] }))
    })
  }
}
