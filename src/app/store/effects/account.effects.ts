import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AccountService } from '@app/services';
import * as AccountActions from '../actions/account.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.login),
      mergeMap(({ email, password }) =>
        this.accountService.login(email, password).pipe(
          map((user) => AccountActions.loginSuccess({ user })),
          catchError((error) => of(AccountActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.loginSuccess),
        tap(() => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
          this.accountService.startRefreshTokenTimer();
        })
      ),
    { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.refreshToken),
      mergeMap(() =>
        this.accountService.refreshToken().pipe(
          map((user) => AccountActions.refreshTokenSuccess({ user })),
          catchError((error) =>
            of(AccountActions.refreshTokenFailure({ error }))
          )
        )
      )
    )
  );

  refreshTokenSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.refreshTokenSuccess),
        tap(() => {
          this.accountService.startRefreshTokenTimer();
        })
      ),
    { dispatch: false }
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.logOut),
        tap(() => {
          this.accountService.logout();
        })
      ),
    { dispatch: false }
  );
}
