import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from '@app/models';
import { AccountService, AlertService } from '@app/services';
import { WalkerService } from '@app/services/walker.service';
import {
  ConfirmDialogData,
  ConfirmDialogComponent,
} from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { AppState } from '@app/store';
import { askVerification, login } from '@app/store/actions/account.actions';
import { Store, select } from '@ngrx/store';
import { Observable, first } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  Role = Role;
  loading$: Observable<boolean | null>;

  constructor(
    private accountService: AccountService,
    private walkerService: WalkerService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select((state) => state.account.loading));
  }

  get account() {
    return this.accountService.accountValue;
  }

  askForVerification() {
    this.store.dispatch(askVerification({ id: this.account.id }));
  }

  openConfirmDialog(): void {
    const dialogData: ConfirmDialogData = {
      title: 'Ask for verification',
      message: 'Are you sure? verification costs $5',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Acción cuando se confirma
        this.askForVerification();
      }
    });
  }
}
