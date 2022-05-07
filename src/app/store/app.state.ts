import { AuthState } from './auth/auth.state';
import { UserState } from './user/user.state';

export interface AppState {
  user: UserState;
  auth: AuthState;
}
