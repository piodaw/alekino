import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { UserData } from 'src/app/features/home/subpages/settings/settings.interfaces'
import { UpperCasePipe } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-settings-phone',
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
      <h2>{{ 'Edytuj numer telefonu' | uppercase | translate }}</h2>
      <form [formGroup]="phoneForm" (ngSubmit)="updatePhone()">
        <mat-form-field appearance="outline" color="accent">
          <mat-label>{{ 'Nowy numer telefonu' | uppercase | translate }}</mat-label>
          <input matInput [placeholder]="'Numer telefonu' | uppercase | translate" formControlName="phone">
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
export class SettingsPhoneComponent {
  @Output() formData = new EventEmitter<Partial<UserData>>()

  private formBuilder = inject(NonNullableFormBuilder)

  phoneForm = this.createPhoneForm()

  updatePhone() {
    this.phoneForm.markAllAsTouched()

    if (this.phoneForm.invalid) {
      return
    }

    this.formData.emit(this.phoneForm.value)
  }

  private createPhoneForm() {
    return this.formBuilder.group({
      phone: this.formBuilder.control('', [Validators.required])
    })
  }
}
