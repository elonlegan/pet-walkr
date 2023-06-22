import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Account } from '@app/models';
import { AppState } from '@app/store';
import { Store } from '@ngrx/store';
import { refreshToken } from '@store/actions/account.actions';

const baseUrl = `${environment.apiUrl}/accounts`;

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  public get accountValue(): Account {
    let accountValue: Account;

    this.store
      .select((state) => state.account)
      .subscribe((account) => {
        accountValue = account.user;
      });

    return accountValue;
  }

  login(email: string, password: string) {
    return this.http.post<any>(
      `${baseUrl}/authenticate`,
      { email, password },
      { withCredentials: true }
    );
  }

  logout() {
    this.http
      .post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true })
      .subscribe();
    this.stopRefreshTokenTimer();
    // this.accountSubject.next(null);
  }

  refreshToken() {
    return this.http.post<any>(
      `${baseUrl}/refresh-token`,
      {},
      { withCredentials: true }
    );
  }

  getRoles() {
    return this.http.get<any[]>(`${baseUrl}/roles`);
  }

  register(account: Account) {
    return this.http.post(`${baseUrl}/register`, account);
  }

  verifyEmail(token: string) {
    return this.http.post(`${baseUrl}/verify-email`, { token });
  }

  getAll() {
    return this.http.get<Account[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Account>(`${baseUrl}/${id}`);
  }

  create(params) {
    return this.http.post(baseUrl, params);
  }

  update(id, params) {
    return this.http.put(`${baseUrl}/${id}`, params).pipe(
      map((account: any) => {
        // update the current account if it was updated
        if (account.id === this.accountValue.id) {
          // publish updated account to subscribers
          account = { ...this.accountValue, ...account };
          // this.accountSubject.next(account);
        }
        return account;
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`).pipe(
      finalize(() => {
        // auto logout if the logged in account was deleted
        if (id === this.accountValue.id) this.logout();
      })
    );
  }

  // helper methods

  private refreshTokenTimeout;

  startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.store.dispatch(refreshToken()),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
