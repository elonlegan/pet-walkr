import { Account } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const register = createAction('[Auth] Register', props<Account>());

export const registerSuccess = createAction('[Auth] Register Success');

export const registerFailure = createAction(
  '[Auth] Register Failure',
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

export const verifyEmail = createAction(
  '[Auth] Verify Email',
  props<{ token: string }>()
);

export const verifyEmailSuccess = createAction('[Auth] Verify Email Success');

export const verifyEmailFailure = createAction(
  '[Auth] Verify Email Failure',
  props<{ error: any }>()
);

export const logOut = createAction('[Auth] Logout');

export const askVerification = createAction(
  '[Auth] Ask Verification',
  props<{ id: string }>()
);
export const askVerificationSuccess = createAction(
  '[Auth] Ask Verification Success',
  props<{ user: any }>()
);

export const askVerificationFailure = createAction(
  '[Auth] Ask Verification Failure',
  props<{ error: any }>()
);
