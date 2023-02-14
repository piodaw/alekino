import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'

import { StepperComponent } from '@shared/ui/stepper/stepper.component';
import { MatListModule } from '@angular/material/list'
import { NgForOf, UpperCasePipe } from '@angular/common'
import { MenuItems } from '@shared/ui/settings-card/settings-menu/constants/menu-items'
import { MatIconModule } from '@angular/material/icon'
import { MatLineModule } from '@angular/material/core'
import { TranslateModule } from '@ngx-translate/core'


@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [
    StepperComponent,
    MatListModule,
    NgForOf,
    MatIconModule,
    MatLineModule,
    UpperCasePipe,
    TranslateModule
  ],
  templateUrl: 'settings-menu.component.html',
  styleUrls: ['settings-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsMenuComponent {
  @Output() navigation = new EventEmitter<number>()
  menuItems = MenuItems

  navigationHandler(id: number) {
    this.navigation.emit(id)
  }
}
