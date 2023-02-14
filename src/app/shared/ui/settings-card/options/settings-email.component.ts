import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { emailValidator } from '@shared/validators/form.validators'
import { UserData } from 'src/app/features/home/subpages/settings/settings.interfaces'
import { UpperCasePipe } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-settings-email',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    UpperCasePipe,
    TranslateModule
  ],
  template: `
    <div class="general-form-wrapper">
      <h2>{{ 'Edytuj adres email' | uppercase | translate }}</h2>
      <form [formGroup]="updateEmailForm" (ngSubmit)="updateEmail()">
        <mat-form-field appearance="outline" color="accent">
          <mat-label>{{ 'Stary adres email' | uppercase | translate }}</mat-label>
          <input matInput [placeholder]="'Email' | uppercase | translate" formControlName="oldEmail">
          <mat-error></mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>{{ 'Nowy adres email' | uppercase | translate }}</mat-label>
          <input matInput [placeholder]="'Email' | uppercase | translate" formControlName="newEmail">
          <mat-error></mat-error>
        </mat-form-field>
        <div class="button-wrapper">
          <button mat-raised-button color="primary">{{ 'Zapisz' | uppercase | translate }}</button>
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
export class SettingsEmailComponent {
  @Output() formData = new EventEmitter<Partial<UserData>>()
  private formBuilder = inject(NonNullableFormBuilder)

  updateEmailForm = this.createUpdateEmailForm()

  updateEmail() {
    this.updateEmailForm.markAllAsTouched()

    if (this.updateEmailForm.invalid) {
      return
    }

    this.formData.emit(this.updateEmailForm.getRawValue())
  }

  private createUpdateEmailForm() {
    return this.formBuilder.group({
      oldEmail: this.formBuilder.control('', [Validators.required, emailValidator]),
      newEmail: this.formBuilder.control('', [Validators.required, emailValidator])
    })
  }
}
