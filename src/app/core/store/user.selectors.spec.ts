import * as userSelectors from './user.selectors';

describe('UserSelectors', () => {
  const initialState = {
    user: {
      user: {
        userId: 1,
        firstName: 'Testowy',
        lastName: 'User',
        email: 'test@user.com',
        phone: '123456789',
        role: 0,
      },
    },
  };

  it('Should select user', () => {
    const result = userSelectors.selectLoggedUser.projector(initialState.user);
    expect(result).toEqual(initialState.user.user);
  });
});
