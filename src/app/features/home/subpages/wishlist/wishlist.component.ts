import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { selectLoggedUser } from '@core/store/user.selectors'
import { Store } from '@ngrx/store'
import { FavMovieCardComponent } from '@shared/ui/fav-movie-card/fav-movie-card.component'
import { WishListStore } from './store/wishlist.store'

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    FavMovieCardComponent
  ],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  providers: [WishListStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent implements OnInit {
  private store = inject(Store)
  private wishListStore = inject(WishListStore)

  loggedUser$ = this.store.select(selectLoggedUser)
  favMovies$ = this.wishListStore.select(state => state.wishlist)

  ngOnInit() {
    this.wishListStore.getUserWishlist(this.loggedUser$)
  }

  removeWishlistHandler(id: number) {
    this.wishListStore.removeWishListItem(id)
  }
}
