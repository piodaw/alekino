import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import { AuthActions } from 'src/app/features/auth/store/auth.actions'
import { Routing } from '@shared/routes/routing'
import { emailValidator, whitespaceValidator } from '@shared/validators/form.validators'
import { NgIf } from '@angular/common'
import { getErrorMessage } from '@shared/form-errors/form.errors'

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private formBuilder = inject(NonNullableFormBuilder)
  private store = inject(Store)

  hide = true
  routing = Routing

  loginForm = this.createLoginForm()

  errorMessage(formControlName: 'email' | 'password') {
    return getErrorMessage(formControlName, this.loginForm)
  }

  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(AuthActions.login({ loginData: this.loginForm.getRawValue() }));
  }

  private createLoginForm() {
    return this.formBuilder.group({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        whitespaceValidator,
        emailValidator
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
