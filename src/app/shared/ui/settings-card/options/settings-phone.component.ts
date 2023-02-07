import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-settings-phone',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="general-form-wrapper">
      <h2>Edytuj numer telefonu</h2>
      <form>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Nowy numer telefonu</mat-label>
          <input matInput placeholder="Numer telefonu">
          <mat-error></mat-error>
        </mat-form-field>
        <div class="button-wrapper">
          <button mat-raised-button color="primary">Zapisz</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .general-form-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    h2 {
      margin-bottom: 36px;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .button-wrapper {
      margin-top: 12px;
      width: 200px;
    }

    button {
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPhoneComponent {
}
