import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm.component';

@Injectable()
export class ConfirmService {
  constructor(private dialog: MatDialog) { }

  activate(message?: string): Promise<boolean> {
    let dialogRef: MatDialogRef<ConfirmComponent>;

    dialogRef = this.dialog.open(ConfirmComponent, {
      role: 'dialog',
      disableClose: true,
      width: '55%',
      position: {
        top: '5%',
      },
      panelClass: 'alert-modal-wrapper',
      data: { message},
    });

    dialogRef.afterClosed().subscribe(result => {
    });

    return dialogRef.afterClosed().toPromise();
  }
}
