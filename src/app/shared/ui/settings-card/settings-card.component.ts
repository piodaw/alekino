import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { AsyncPipe, NgSwitch, NgSwitchCase } from '@angular/common'

import { SettingsMenuComponent } from '@shared/ui/settings-card/settings-menu/settings-menu.component'
import { SettingsGeneralComponent } from '@shared/ui/settings-card/options/settings-general.component'
import { SettingsPasswordComponent } from '@shared/ui/settings-card/options/settings-password.component'
import { SettingsEmailComponent } from '@shared/ui/settings-card/options/settings-email.component'
import { SettingsPhoneComponent } from '@shared/ui/settings-card/options/settings-phone.component'
import { SettingsNewsletterComponent } from '@shared/ui/settings-card/options/settings-newsletter.component'
import { User } from '@core/store/user.interfaces'
import { UserData } from 'src/app/features/home/subpages/settings/settings.interfaces'

@Component({
  selector: 'app-settings-card',
  standalone: true,
  imports: [
    SettingsMenuComponent,
    NgSwitch,
    AsyncPipe,
    SettingsGeneralComponent,
    NgSwitchCase,
    SettingsPasswordComponent,
    SettingsEmailComponent,
    SettingsPhoneComponent,
    SettingsNewsletterComponent
  ],
  templateUrl: 'settings-card.component.html',
  styleUrls: ['settings-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsCardComponent {
  @Output() navigation = new EventEmitter<number>()
  @Input() page$!: Observable<number>
  @Input() user$!: Observable<User>
  @Input() newsletter$!: Observable<boolean>
  @Output() formData = new EventEmitter<Partial<UserData>>()
  @Output() newsletter = new EventEmitter<boolean>()

  nagivationHandler(id: number) {
    this.navigation.emit(id)
  }

  newsletterHandler(value: { newsletter: boolean }) {
    this.newsletter.emit(value.newsletter)
  }

  formDataHandler(data: Partial<User>) {
    this.formData.emit(data)
  }
}
