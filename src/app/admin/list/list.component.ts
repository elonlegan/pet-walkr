import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/services';
import { Account } from '@app/models';
import { Observable } from 'rxjs';
import { AppState } from '@app/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  accounts: any[];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  constructor(
    private accountService: AccountService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe((accounts) => (this.accounts = accounts));
  }

  deleteAccount(id: string) {
    const account = this.accounts.find((x) => x.id === id);
    account.isDeleting = true;
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.accounts = this.accounts.filter((x) => x.id !== id);
      });
  }

  get admin() {
    return this.accountService.accountValue;
  }
}
