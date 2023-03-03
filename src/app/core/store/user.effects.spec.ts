import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import * as UserActions from './user.actions';

let actions$ = new Observable<Action>();

describe('UserEffects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions$)],
    });
  });

  it('should be created', () => {
    actions$ = of(UserActions.UserActions.getUser());

    expect(true).toBeTruthy();
  });
});
