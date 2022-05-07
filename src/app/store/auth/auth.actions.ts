import { createAction } from '@ngrx/store';

export const AuthActions = {
  login: createAction('[Auth] Login user'),
  logout: createAction('[Auth] Logout user'),
};
