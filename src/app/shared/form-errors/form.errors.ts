import { FormGroup } from '@angular/forms'

export type controlName = 'email' | 'password' | 'firstName' | 'lastName' | 'phoneNumber';

export const errorsTree = {
  email: {
    required: 'Pole wymagane',
    minlength: 'Email jest za krótki',
    maxlength: 'Email jest za długi',
    whitespace: 'Email nie może zawierać spacji',
    email: 'Email jest niepoprawny',
    phone: 'Numer telefonu jest niepoprawny'
  },
  password: {
    required: 'Pole wymagane',
    minlength: 'Hasło jest za krótkie',
    maxlength: 'Hasło jest za długie',
    whitespace: 'Hasło nie może zawierać spacji',
    email: 'Email jest niepoprawny',
    phone: 'Numer telefonu jest niepoprawny'
  },
  firstName: {
    required: 'Pole wymagane',
    minlength: 'Imię jest za krótkie',
    maxlength: 'Imię jest za długie',
    whitespace: 'Imię nie może zawierać spacji',
    email: 'Email jest niepoprawny',
    phone: 'Numer telefonu jest niepoprawny'
  },
  lastName: {
    required: 'Pole wymagane',
    minlength: 'Nazwisko jest za krótkie',
    maxlength: 'Nazwisko jest za długie',
    whitespace: 'Nazwisko nie może zawierać spacji',
    email: 'Email jest niepoprawny',
    phone: 'Numer telefonu jest niepoprawny'
  },
  phoneNumber: {
    required: 'Pole wymagane',
    minlength: 'Numer telefonu jest za krótki',
    maxlength: 'Numer telefonu jest za długi',
    whitespace: 'Numer telefonu nie może zawierać spacji',
    email: 'Email jest niepoprawny',
    phone: 'Numer telefonu jest niepoprawny'
  }
};

export const getErrorMessage = (formControlName: controlName, form: FormGroup) => {
  const control = form.get(formControlName);

  if (control?.hasError('required')) {
    return errorsTree[formControlName].required;
  }

  if (control?.hasError('minlength')) {
    return errorsTree[formControlName].minlength;
  }

  if (control?.hasError('maxlength')) {
    return errorsTree[formControlName].maxlength;
  }

  if (control?.hasError('whitespace')) {
    return errorsTree[formControlName].whitespace;
  }

  if (control?.hasError('email')) {
    return errorsTree[formControlName].email;
  }

  if (control?.hasError('phone')) {
    return errorsTree[formControlName].phone;
  }

  return '';
}