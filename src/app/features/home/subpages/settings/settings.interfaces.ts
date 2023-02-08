import { User } from "@core/store/user.interfaces";

export interface UserData extends User {
  oldEmail: string;
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
  newEmail: string;
}