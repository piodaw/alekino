import { UserState } from "./user.interfaces";

export const initialUserState: UserState = {
  user: {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 0
  }
};