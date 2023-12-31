import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/services';
import { MustMatch } from '@app/helpers';
import { AppState } from '@app/store';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { register } from '@app/store/actions/account.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: UntypedFormGroup;
  loading$: Observable<boolean | null>;

  submitted = false;
  roles = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select((state) => state.account.loading));

    this.accountService
      .getRoles()
      .pipe(first())
      .subscribe((roles) => (this.roles = roles));

    this.form = this.formBuilder.group(
      {
        role: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(register(this.form.value));
  }
}
