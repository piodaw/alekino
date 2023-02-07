import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { RouterLink } from '@angular/router'
import { AsyncPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { ShowingData } from 'src/app/features/home/shared/home.interfaces'
import { Routing } from '@shared/routes/routing'
import { User } from '@core/store/user.interfaces'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatCardModule,
    NgIf,
    NgForOf,
    NgOptimizedImage,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: 'movie-card.component.html',
  styleUrls: ['movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  @Input() showing$!: Observable<ShowingData>
  @Input() loggedIn$!: Observable<User>
  @Output() movieSelected = new EventEmitter<string>();
  @Output() redirectToReservation = new EventEmitter<string>();
  @Output() wishList = new EventEmitter<{ user_id: number, movie_id: number }>();

  showFullDescriptions: { [key: number]: boolean } = {};

  toggleShowMore(showId: number) {
    this.showFullDescriptions[showId] = !this.showFullDescriptions[showId];
  }

  // retrieve the shows from the Observable
  ngOnInit() {
    this.showing$
      .subscribe(shows => {
        shows.showings.forEach(show => {
          this.showFullDescriptions[show.id!] = false;
        });
      });
  }

  redirectToReservationPage(id: number) {
    this.redirectToReservation.emit(`${Routing.RESERVATION}/${id}`);
  }

  addToWishList(user_id: number, movie_id: number) {
    this.wishList.emit({ user_id, movie_id });
  }
}