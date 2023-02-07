export interface UserState {
  user: User;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: number;
}