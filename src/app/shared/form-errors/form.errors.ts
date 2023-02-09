import { FormGroup } from '@angular/forms'

export type controlName = 'email' | 'emailRepeat' | 'password' | 'firstName' | 'lastName' | 'phoneNumber';

export const errorsTree = {
  email: {
    required: 'Pole wymagane',
    minlength: 'Email jest za krótki',
    maxlength: 'Email jest za długi',
    whitespace: 'Email nie może zawierać spacji',
    email: 'Email jest niepoprawny',
    emailMatch: 'Email nie zgadza się',
    phone: '',
    numbers: '',
    letters: ''
  },
  emailRepeat: {
    required: 'Pole wymagane',
    minlength: 'Email jest za krótki',
    maxlength: 'Email jest za długi',
    whitespace: 'Email nie może zawierać spacji',
    email: 'Email jest niepoprawny',
    emailMatch: 'Email musi być taki sam',
    phone: '',
    numbers: '',
    letters: ''
  },
  password: {
    required: 'Pole wymagane',
    minlength: 'Hasło jest za krótkie',
    maxlength: 'Hasło jest za długie',
    whitespace: 'Hasło nie może zawierać spacji',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: '',
    letters: ''
  },
  firstName: {
    required: 'Pole wymagane',
    minlength: 'Imię jest za krótkie',
    maxlength: 'Imię jest za długie',
    whitespace: 'Imię nie może zawierać spacji',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: '',
    letters: 'Imię może zawierać tylko litery'
  },
  lastName: {
    required: 'Pole wymagane',
    minlength: 'Nazwisko jest za krótkie',
    maxlength: 'Nazwisko jest za długie',
    whitespace: 'Nazwisko nie może zawierać spacji',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: '',
    letters: 'Nazwisko może zawierać tylko litery'
  },
  phoneNumber: {
    required: 'Pole wymagane',
    minlength: 'Numer telefonu jest za krótki',
    maxlength: 'Numer telefonu jest za długi',
    whitespace: 'Numer telefonu nie może zawierać spacji',
    email: '',
    emailMatch: '',
    phone: 'Numer telefonu jest niepoprawny',
    numbers: 'Numer telefonu może zawierać tylko cyfry',
    letters: ''
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

  if (control?.hasError('numbers')) {
    return errorsTree[formControlName].numbers;
  }

  if (control?.hasError('letters')) {
    return errorsTree[formControlName].letters;
  }

  if (control?.hasError('emailMatch')) {
    return errorsTree[formControlName].emailMatch;
  }

  return '';
}