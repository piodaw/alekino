import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { SettingsCardComponent } from '@shared/ui/settings-card/settings-card.component'
import { SettingsStore } from 'src/app/features/home/subpages/settings/store/settings.store'
import { Store } from '@ngrx/store'
import { selectLoggedUser } from '@core/store/user.selectors'
import { UserData } from './settings.interfaces'
import { take } from 'rxjs'


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    SettingsCardComponent
  ],
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss'],
  providers: [SettingsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private settingsStore = inject(SettingsStore)
  private store = inject(Store)

  page$ = this.settingsStore.select(state => state.page)
  newsletter$ = this.settingsStore.select(state => state.newsletter)
  user$ = this.store.select(selectLoggedUser)

  navigationHandler(id: number) {
    this.settingsStore.setCurrentPage(id)

    if (id === 4) {
      this.user$.subscribe(user => {
        this.settingsStore.checkIfUserHasNewsletter(user.email)
      })
    }
  }

  updateUser(user: Partial<UserData>) {
    this.user$.pipe(take(1)).subscribe(loggedUser => {
      this.settingsStore.updateUserData({ ...loggedUser, ...user })
    })
  }

  updateNewsletter(value: boolean) {
    this.user$.pipe(take(1)).subscribe(loggedUser => {
      this.settingsStore.updateNewsletter({ ...loggedUser, newsletter: value })
    })
  }
}
