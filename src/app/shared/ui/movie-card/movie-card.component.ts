import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { RouterLink } from '@angular/router'
import { AsyncPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { ShowingData } from 'src/app/features/home/shared/home.interfaces'
import { Routing } from '@shared/routes/routing'
import { User } from '@core/store/user.interfaces'

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
export class MovieCardComponent implements OnInit {
  @Input() showing$!: Observable<ShowingData>
  @Input() loggedIn$!: Observable<User>
  @Output() movieSelected = new EventEmitter<string>();
  @Output() redirectToReservation = new EventEmitter<string>();
  @Output() wishList = new EventEmitter<{ user_id: number, movie_id: number }>();

  showFullDescriptions: { [key: number]: boolean } = {};

  toggleShowMore(showId: number) {
    this.showFullDescriptions[showId] = !this.showFullDescriptions[showId];
  }

  isHourPast(hour: string) {
    const now = new Date();
    const showTime = new Date(hour);
    return now > showTime;
  }

  ngOnInit() {
    this.showing$
      .subscribe(shows => {
        shows.showings.forEach(show => {
          if (show.id) {
            this.showFullDescriptions[show.id] = false;
          }
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