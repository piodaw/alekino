import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Routing } from '@shared/routes/routing'
import { controlName, getErrorMessage } from '@shared/form-errors/form.errors'
import { NgIf, UpperCasePipe } from '@angular/common'
import { emailValidator, phoneValidator, whitespaceValidator } from '@shared/validators/form.validators'
import { AuthActions } from 'src/app/features/auth/store/auth.actions'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    UpperCasePipe,
    TranslateModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private formBuilder = inject(NonNullableFormBuilder)
  private store = inject(Store)

  hide = true
  routing = Routing

  registerForm = this.createRegisterForm()

  errorMessage(formControlName: controlName) {
    return getErrorMessage(formControlName, this.registerForm)
  }

  register() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(AuthActions.register({ registerData: this.registerForm.getRawValue() }));
  }

  private createRegisterForm() {
    return this.formBuilder.group({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        whitespaceValidator,
        emailValidator
      ]),
      firstName: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        whitespaceValidator
      ]),
      lastName: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        whitespaceValidator
      ]),
      phoneNumber: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        whitespaceValidator,
        phoneValidator
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        whitespaceValidator
      ]),
    });
  }
}
