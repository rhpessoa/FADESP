import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NovaTarefaFormComponent } from './nova-tarefa-form.component';
import { first } from 'rxjs/operators';

@Injectable()
export class NovaTarefaFormService {

  constructor(private dialog: MatDialog) { }

  showDialog(taskId: string): Observable<void> {
    let dialogRef: MatDialogRef<NovaTarefaFormComponent>;

    dialogRef = this.dialog.open(NovaTarefaFormComponent, {
      disableClose: true,
      width: '50%',
      height: '80%',
      panelClass: 'modal-wrapper',
    });

    dialogRef.componentInstance.initialize(taskId);

    return dialogRef.afterClosed().pipe(first());
  }
}
