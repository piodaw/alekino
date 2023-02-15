import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { WishList } from '../../../shared/home.interfaces';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { User } from '@core/store/user.interfaces';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from '@core/store/user.selectors';
import { ToastFacadeService } from '@shared/services/toast.facade.service'
import { Routing } from '@shared/routes/routing'

export interface WishlistState {
  wishlist: WishList[];
}

@Injectable()
export class WishListStore extends ComponentStore<WishlistState> {
  private wishlistService = inject(WishlistService);
  private toastService = inject(ToastFacadeService);
  private router = inject(Router);
  private store = inject(Store)

  user$ = this.store.select(selectLoggedUser)

  constructor() {
    super({
      wishlist: [],
    });
  }

  readonly getUserWishlist = this.effect((userId$: Observable<User>) => {
    return userId$.pipe(
      switchMap(({ userId }) => {
        return this.wishlistService.getUserWishlist(userId);
      }),
      tapResponse(
        ({wishlist}) => this.patchState({ wishlist }),
        () => this.router.navigate([Routing.HOME])
      )
    );
  });

  readonly removeWishListItem = this.effect((wishlistId$: Observable<number>) => {
    return wishlistId$.pipe(
      switchMap((wishlistId) => {
        return this.wishlistService.removeWishListItem(wishlistId);
      }),
      tapResponse(
        () => this.getUserWishlist(this.user$),
        () => {
          this.toastService.showError('Nie udało się usunąć filmu');
        }
      )
    );
  })
}
