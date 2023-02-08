import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { Observable } from 'rxjs'

import { User } from '@core/store/user.interfaces'
import { UserData } from 'src/app/features/home/subpages/settings/settings.interfaces'

@Component({
  selector: 'app-settings-general',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  template: `
    <div class="general-form-wrapper">
      <h2>Edytuj dane osobowe</h2>
      <form [formGroup]="updateUserForm" (ngSubmit)="updateUser()">
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Imię</mat-label>
          <input matInput placeholder="Imię" formControlName="firstName">
          <mat-error></mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Nazwisko</mat-label>
          <input matInput placeholder="Nazwisko" formControlName="lastName">
          <mat-error></mat-error>
        </mat-form-field>
        <div class="button-wrapper">
          <button mat-raised-button type="submit" color="primary">Zapisz</button>
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
export class SettingsGeneralComponent implements OnInit {
  @Input() user$!: Observable<User>
  @Output() formData = new EventEmitter<Partial<UserData>>()

  private formBuilder = inject(NonNullableFormBuilder)

  updateUserForm = this.createUserForm()

  ngOnInit() {
    this.getUserData()
  }

  updateUser() {
    this.updateUserForm.markAllAsTouched()

    if (this.updateUserForm.invalid) {
      return
    }

    this.formData.emit(this.updateUserForm.getRawValue())
  }

  private createUserForm() {
    return this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required])
    })
  }

  private getUserData() {
    return this.user$.subscribe(user => {
      this.updateUserForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName
      })
    })
  }
}
