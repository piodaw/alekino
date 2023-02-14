import { FormGroup } from '@angular/forms'

export type controlName =
  'email' |
  'emailRepeat' |
  'password' |
  'firstName' |
  'lastName' |
  'phoneNumber' |
  'blikCode' |
  'ticketNumber' |
  'code' |
  'discount' |
  'title' |
  'description' |
  'duration' |
  'genre' |
  'age' |
  'img' |
  'rating';

export const errorsTree = {
  email: {
    required: 'Pole wymagane',
    minlength: 'Email jest za krótki',
    maxlength: 'Email jest za długi',
    min: '',
    max: '',
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
    min: '',
    max: '',
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
    min: '',
    max: '',
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
    min: '',
    max: '',
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
    min: '',
    max: '',
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
    min: '',
    max: '',
    whitespace: 'Numer telefonu nie może zawierać spacji',
    email: '',
    emailMatch: '',
    phone: 'Numer telefonu jest niepoprawny',
    numbers: 'Numer telefonu może zawierać tylko cyfry',
    letters: ''
  },
  blikCode: {
    required: 'Pole wymagane',
    minlength: 'Kod blik jest za krótki',
    maxlength: '',
    min: '',
    max: '',
    whitespace: 'Kod blik nie może zawierać spacji',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: 'Kod blik może zawierać tylko cyfry',
    letters: ''
  },
  ticketNumber: {
    required: 'Pole wymagane',
    minlength: 'Numer biletu jest za krótki',
    maxlength: 'Numer biletu jest za długi',
    min: '',
    max: '',
    whitespace: 'Numer zawiera spacje',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: 'Numer może zawierać tylko cyfry',
    letters: ''
  },
  code: {
    required: 'Pole wymagane',
    minlength: 'Nazwa jest za krótka',
    maxlength: 'Nazwa jest za długa',
    min: '',
    max: '',
    whitespace: 'Nazwa nie może zawierać spacji',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: '',
    letters: ''
  },
  discount: {
    required: 'Pole wymagane',
    minlength: '',
    maxlength: '',
    min: 'Wartość musi być większa od 5',
    max: 'Warotść musi być mniejsza od 80',
    whitespace: 'Wartość nie może zawierać spacji',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: 'Warość może zawierać tylko cyfry',
    letters: ''
  },
  title: {
    required: 'Pole wymagane',
    minlength: 'Tytuł jest za krótki',
    maxlength: 'Tytuł jest za długi',
    min: '',
    max: '',
    whitespace: '',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: '',
    letters: ''
  },
  description: {
    required: 'Pole wymagane',
    minlength: 'Opis jest za krótki',
    maxlength: 'Opis jest za długi',
    min: '',
    max: '',
    whitespace: '',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: '',
    letters: ''
  },
  duration: {
    required: 'Pole wymagane',
    minlength: 'Czas trwania jest za krótki',
    maxlength: 'Czas trwania jest za długi',
    min: '',
    max: '',
    whitespace: 'Czas trwania nie może zawierać spacji',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: 'Czas trwania może zawierać tylko cyfry',
    letters: ''
  },
  genre: {
    required: 'Pole wymagane',
    minlength: '',
    maxlength: '',
    min: '',
    max: '',
    whitespace: 'Gatunek nie może zawierać spacji',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: '',
    letters: ''
  },
  age: {
    required: 'Pole wymagane',
    minlength: '',
    maxlength: '',
    min: '',
    max: '',
    whitespace: '',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: '',
    letters: ''
  },
  img: {
    required: 'Pole wymagane',
    minlength: 'Link jest za krótki',
    maxlength: 'Link jest za długi',
    min: '',
    max: '',
    whitespace: 'Link nie może zawierać spacji',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: '',
    letters: ''
  },
  rating: {
    required: 'Pole wymagane',
    minlength: '',
    maxlength: '',
    min: 'Ocena musi być większa od 0',
    max: 'Max ocena to 10',
    whitespace: '',
    email: '',
    emailMatch: '',
    phone: '',
    numbers: '',
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

  if (control?.hasError('min')) {
    return errorsTree[formControlName].min;
  }

  if (control?.hasError('max')) {
    return errorsTree[formControlName].max;
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