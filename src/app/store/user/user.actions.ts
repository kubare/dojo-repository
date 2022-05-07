import { createAction, props } from '@ngrx/store';
import { UserState } from './user.state';

export const UserActions = {
  login: createAction('[User] User data', props<UserState>()),
  logout: createAction('[Auth] Logout user'),
};
