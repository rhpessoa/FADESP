import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  showSuccessMessage(message: string) {
    const snackBarRef = this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }
}
