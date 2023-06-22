import { createReducer, on } from '@ngrx/store';
import * as AccountActions from '../actions/account.actions';
import { Account } from '@app/models';

export interface AccountState {
  loading: boolean;
  user: Account;
  error: any;
}

export const initialState: AccountState = {
  loading: false,
  user: null,
  error: null,
};

export const accountReducer = createReducer(
  initialState,
  on(AccountActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AccountActions.loginSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
    error: null,
  })),
  on(AccountActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    user: null,
    error,
  })),
  on(AccountActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AccountActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AccountActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AccountActions.refreshToken, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AccountActions.refreshTokenSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
    error: null,
  })),
  on(AccountActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    loading: false,
    user: null,
    error,
  })),
  on(AccountActions.verifyEmail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AccountActions.verifyEmailSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AccountActions.verifyEmailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AccountActions.logOut, (state) => ({
    ...state,
    user: null,
  }))
);
