import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Refresh Token',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ user: any }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const refreshToken = createAction('[Auth] Refresh Token');

export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ user: any }>()
);

export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: any }>()
);

export const logOut = createAction('[Auth] Logout');
