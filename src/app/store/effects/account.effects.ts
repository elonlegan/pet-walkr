import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/services';
import * as AccountActions from '../actions/account.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { WalkerService } from '@app/services/walker.service';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private walkerService: WalkerService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
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

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.loginFailure),
        tap(({ error }) => {
          this.alertService.error(error);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.register),
      mergeMap((account) =>
        this.accountService.register(account).pipe(
          map(() => AccountActions.registerSuccess()),
          catchError((error) => of(AccountActions.registerFailure({ error })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.registerSuccess),
        tap(() => {
          this.alertService.success(
            'Registration successful, please check your email for verification instructions'
          );
          this.router.navigate(['/account/login']);
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.registerFailure),
        tap(({ error }) => {
          this.alertService.error(error);
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
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || [];
          this.router.navigateByUrl(returnUrl);
          this.accountService.startRefreshTokenTimer();
        })
      ),
    { dispatch: false }
  );

  verifyEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.verifyEmail),
      mergeMap(({ token }) =>
        this.accountService.verifyEmail(token).pipe(
          map(() => AccountActions.verifyEmailSuccess()),
          catchError((error) =>
            of(AccountActions.verifyEmailFailure({ error }))
          )
        )
      )
    )
  );

  verifyEmailSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.verifyEmailSuccess),
        tap(() => {
          this.alertService.success(
            'Verification successful, you can now login'
          );
          this.router.navigate(['/account/login']);
        })
      ),
    { dispatch: false }
  );

  verifyEmailFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.verifyEmailFailure),
        tap(({ error }) => {
          this.alertService.error(error);
        })
      ),
    { dispatch: false }
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.logOut),
      mergeMap(() =>
        this.accountService
          .logout()
          .pipe(map(() => AccountActions.logOutSuccess()))
      )
    )
  );

  logOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.logOutSuccess),
        tap(() => {
          this.router.navigate(['/account/login']);
          this.accountService.stopRefreshTokenTimer();
        })
      ),
    { dispatch: false }
  );

  askVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.askVerification),
      mergeMap(({ id }) =>
        this.walkerService.askForVerification(id).pipe(
          map((user) => AccountActions.askVerificationSuccess({ user })),
          catchError((error) =>
            of(AccountActions.askVerificationFailure({ error }))
          )
        )
      )
    )
  );

  askVerificationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.askVerificationSuccess),
        tap(() => {
          this.router.navigate(
            this.router.url.includes('account/') ? ['/'] : []
          );
          this.accountService.startRefreshTokenTimer();
        })
      ),
    { dispatch: false }
  );

  askVerificationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountActions.askVerificationFailure),
        tap(({ error }) => {
          this.alertService.error(error);
        })
      ),
    { dispatch: false }
  );
}
