import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from '@app/helpers';
import { AccountService, AlertService } from '@app/services';
import { first } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  form: UntypedFormGroup;
  id: string;
  loading = false;
  submitted = false;
  roles = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.accountService
      .getRoles()
      .pipe(first())
      .subscribe((roles) => (this.roles = roles));

    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['', Validators.required],
        password: ['', [Validators.minLength(6), Validators.nullValidator]],
        confirmPassword: [''],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );

    this.accountService
      .getById(this.id)
      .pipe(first())
      .subscribe((x) => this.form.patchValue(x));
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

    this.loading = true;
    this.updateAccount();
  }

  private updateAccount() {
    this.accountService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful');
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
