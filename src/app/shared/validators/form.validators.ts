import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms'

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

export function allowOnlyNumbersValidator(control: AbstractControl) {
  const onlyNumbersRegex = /^\d+$/g;
  const isValid = onlyNumbersRegex.test(control.value);
  return isValid ? null : { numbers: true };
}

export function allowOnlyLettersValidator(control: AbstractControl) {
  const onlyLettersRegex = /^[a-zA-Z]+$/g;
  const isValid = onlyLettersRegex.test(control.value);
  return isValid ? null : { letters: true };
}

export function emailMatchValidator(control: AbstractControl) {
  const email = control.getRawValue().email;
  const emailRepeat = control.getRawValue().emailRepeat;

  if (!email || !emailRepeat) {
    return null;
  }
  return email === emailRepeat ? null : { emailMatch: true };
}
