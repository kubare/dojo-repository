import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

const initState = {
  email: '',
  uid: '',
  role: '',
};

export const userReducer = createReducer(
  initState,
  on(UserActions.login, (state, props) => {
    return {
      ...state,
      email: props.email,
      uid: props.uid,
      role: props.role,
    };
  }),
  on(UserActions.logout, (state) => {
    return {
      ...state,
      ...initState,
    };
  })
);
