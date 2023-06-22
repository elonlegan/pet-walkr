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
  on(AccountActions.logOut, (state) => ({
    ...state,
    user: null,
  }))
);
