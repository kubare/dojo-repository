import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserState } from './user.state';

const initState: UserState = {
  email: '',
  uid: '',
  role: '',
  favouriteIC: [],
};

export const userReducer = createReducer(
  initState,
  on(UserActions.login, (state, props) => {
    return {
      ...state,
      email: props.email,
      uid: props.uid,
      role: props.role,
      favouriteIC: props.favouriteIC,
    };
  }),
  on(UserActions.addToFavs, (state, props) => {
    return {
      ...state,
      favouriteIC: [...state.favouriteIC, props.name],
    };
  }),
  on(UserActions.logout, (state) => {
    return {
      ...state,
      ...initState,
    };
  })
);
