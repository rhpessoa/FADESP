import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  message!: string;

  constructor(private dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.setLabels(data.message);
  }

  ngOnInit(): any {
  }

  closeDialog(update: boolean) {
    this.dialogRef.close(update);
  }

  private setLabels(message = this.message) {
    this.message = message;
  }
}

