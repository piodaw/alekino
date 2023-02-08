import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { UserData } from 'src/app/features/home/subpages/settings/settings.interfaces'
import { whitespaceValidator } from '@shared/validators/form.validators'

@Component({
  selector: 'app-settings-password',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="general-form-wrapper">
      <h2>Edytuj hasło</h2>
      <form [formGroup]="updatePasswordForm" (ngSubmit)="updatePassword()">
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Stare hasło</mat-label>
          <input matInput placeholder="Hasło" type="password" formControlName="oldPassword">
          <mat-error></mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Nowe hasło</mat-label>
          <input matInput placeholder="Hasło" type="password" formControlName="newPassword">
          <mat-error></mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Powtórz hasło</mat-label>
          <input matInput placeholder="Hasło" type="password" formControlName="passwordRepeat">
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
export class SettingsPasswordComponent {
  @Output() formData = new EventEmitter<Partial<UserData>>()

  private formBuilder = inject(NonNullableFormBuilder);

  updatePasswordForm = this.createUpdatePasswordForm()

  updatePassword() {
    this.updatePasswordForm.markAllAsTouched()

    if (this.updatePasswordForm.invalid) {
      return
    }

    this.formData.emit(this.updatePasswordForm.getRawValue())
  }

  private createUpdatePasswordForm() {
    return this.formBuilder.group({
      oldPassword: this.formBuilder.control('', [Validators.required, whitespaceValidator]),
      newPassword: this.formBuilder.control('', [Validators.required, whitespaceValidator]),
      passwordRepeat: this.formBuilder.control('', [Validators.required, whitespaceValidator])
    })
  }
}
