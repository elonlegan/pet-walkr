import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/services';
import { Account } from '@app/models';
import { Observable } from 'rxjs';
import { AppState } from '@app/store';
import { Store } from '@ngrx/store';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private store: Store<AppState>,
    private dialog: MatDialog
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

  openConfirmDialog(id: string): void {
    const dialogData: ConfirmDialogData = {
      title: 'Delete Account',
      message: '¿Are you sure delete this account?',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAccount(id);
      } else {
        // Acción cuando se cancela
        console.log('Cancelado');
      }
    });
  }
}
