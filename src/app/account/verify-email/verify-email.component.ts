import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/services';
import { AppState } from '@app/store';
import { login, verifyEmail } from '@store/actions/account.actions';
import { Store } from '@ngrx/store';

enum EmailStatus {
  Verifying,
  Failed,
}

@Component({ templateUrl: 'verify-email.component.html' })
export class VerifyEmailComponent implements OnInit {
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];

    // remove token from url to prevent http referer leakage
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    this.store.dispatch(verifyEmail({ token }));
  }
}
