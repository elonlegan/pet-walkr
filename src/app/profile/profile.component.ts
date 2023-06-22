import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from '@app/models';
import { AccountService } from '@app/services';
import {
  ConfirmDialogData,
  ConfirmDialogComponent,
} from '@app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  Role = Role;

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
  ) {}

  get account() {
    return this.accountService.accountValue;
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
        console.log('Confirmado');
      } else {
        // Acción cuando se cancela
        console.log('Cancelado');
      }
    });
  }
}
