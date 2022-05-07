import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

const initState: AuthState = {
  isAuth: false,
};

export const authReducer = createReducer(
  initState,
  on(AuthActions.login, (state) => {
    return {
      ...state,
      isAuth: true,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      isAuth: false,
    };
  })
);
