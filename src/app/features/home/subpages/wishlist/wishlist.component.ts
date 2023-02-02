import { ChangeDetectionStrategy, Component } from '@angular/core'

import { StepperComponent } from '@shared/ui/stepper/stepper.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    StepperComponent
  ],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent {
}
