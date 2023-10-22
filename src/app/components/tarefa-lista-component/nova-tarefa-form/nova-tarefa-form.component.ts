import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../models/tarefa.model';
import { SnackbarService } from '../../../services/snackbar.service';
import { TarefaService } from '../../../services/tarefa.service';
import { ConfirmService } from '../../confirm-component/confirm.service';

@Component({
  selector: 'app-nova-tarefa-form',
  templateUrl: './nova-tarefa-form.component.html',
  styleUrls: ['./nova-tarefa-form.component.css'],
})

export class NovaTarefaFormComponent implements OnInit {
  formSubmitted: boolean = false;
  form!: FormGroup;
  isSubmitting = false;
  task: Task = {} as Task;

  constructor(
    private dialogRef: MatDialogRef<NovaTarefaFormComponent>,
    private fb: FormBuilder,
    private tarefaService: TarefaService,
    private confirmService: ConfirmService,
    private snackbarService: SnackbarService
  )
  {}

  initialize(taskId: string) {
  }

  ngOnInit() {
    this.createFormGroup();
  }

  closeDialog(update: boolean) {
    this.dialogRef.close(update);
  }

  submitTask() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.confirmService.activate("Você tem certeza que quer criar essa tarefa?")
        .then((confirmed: boolean) => {
          if (confirmed) {
            this.prepareSave();
            this.tarefaService.saveTask(this.task)
              .subscribe((result) => {
                if (result) {
                  this.closeDialog(true);
                  this.snackbarService.showSuccessMessage("A tarefa foi criada com sucesso!");
                }
              });
          }
        });
    }
  }

  private prepareSave() {
    const formModel = this.form.getRawValue();
    this.task.name = formModel.name;
    this.task.responsible = formModel.responsible;
    this.task.cpf = formModel.cpf;
    this.task.deadline = formModel.deadline;
    this.task.isDone = false;
    this.task.status = "aberta";
  }

  private validateDate(control: FormControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (selectedDate < currentDate) {
      return { invalidDate: true };
    } else if (selectedDate == currentDate) {
      return { invalidDate: false };
    }
    return null;
  }

  private createFormGroup() {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
        responsible: ['', [Validators.required]],
        deadline: ['', [Validators.required, this.validateDate]],
      },
      {}
    );
  }
}

