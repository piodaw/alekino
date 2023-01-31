export interface UserState {
  user: User;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: number;
}