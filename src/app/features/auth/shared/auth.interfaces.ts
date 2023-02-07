import { User } from '@core/store/user.interfaces'

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}