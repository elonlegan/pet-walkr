import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '@app/models';
import { AppState } from '@app/store';
import { refreshToken } from '@app/store/actions/account.actions';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { map, finalize } from 'rxjs';

const baseUrl = `${environment.apiUrl}/walkers`;

@Injectable({
  providedIn: 'root',
})
export class WalkerService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getAll(params?: HttpParams) {
    return this.http.get<Account[]>(baseUrl, { params });
  }

  getById(id: string) {
    return this.http.get<Account>(`${baseUrl}/${id}`);
  }

  askForVerification(id) {
    return this.http.get(`${baseUrl}/ask-verification/${id}`);
  }

  verifyWalker(id) {
    return this.http.get(`${baseUrl}/verify/${id}`);
  }
}
