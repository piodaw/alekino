import * as fromUser from './user.state';
import * as formUserReducer from './user.reducer';
import * as fromUserActions from './user.actions';

describe('UserReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialUserState } = fromUser;
      const action = {
        type: 'unknown',
      };
      const state = formUserReducer.userReducer(initialUserState, action);

      expect(state).toBe(initialUserState);
    });
  });

  describe('LOGIN_SUCCESS action', () => {
    it('should set user', () => {
      const user = {
        userId: 1,
        firstName: 'User',
        lastName: 'User',
        email: 'user@tst.com',
        phone: '123456789',
        role: 1,
      };
      const { initialUserState } = fromUser;
      const action = fromUserActions.UserApiActions.getUserSuccess({ user });
      const state = formUserReducer.userReducer(initialUserState, action);

      expect(state.user).toEqual(user);
    });
  });
});
