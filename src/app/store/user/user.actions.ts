import { createAction, props } from '@ngrx/store';
import { UserState } from './user.state';

export const UserActions = {
  login: createAction('[User] User data', props<UserState>()),
  addToFavs: createAction(
    '[User] User add favs ice cream',
    props<{ name: string }>()
  ),
  logout: createAction('[Auth] Logout user'),
};
