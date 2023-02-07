import { AbstractControl } from '@angular/forms';

export function whitespaceValidator(control: AbstractControl) {
  const whitespaceRegex = /\s/g;
  const isValid = !whitespaceRegex.test(control.value);
  return isValid ? null : { whitespace: true };
}

export function emailValidator(control: AbstractControl) {
  const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isValid = emailRegex.test(control.value);
  return isValid ? null : { email: true };
}

export function phoneValidator(control: AbstractControl) {
  const phoneRegex = /^(\+48)?\d{9}$/;
  const isValid = phoneRegex.test(control.value);
  return isValid ? null : { phone: true };
}