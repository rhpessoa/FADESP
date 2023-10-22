import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../models/tarefa.model';
import { TarefaService } from '../../../services/tarefa-service.service';

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
  )
  {}

  initialize(taskId: string,) {
  }

  ngOnInit() {
    this.createFormGroup();
  }

  private editOrder(orderId: string) {

  }

  closeDialog(update: boolean) {
    this.dialogRef.close(update);
  }

  submitTask() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.prepareSave();
      this.tarefaService.saveTask(this.task)
        .subscribe((result) => {
          if (result) {
            this.closeDialog(true);
          }
      });
    }
    }

  private prepareSave() {
    const formModel = this.form.getRawValue();
    const ano = formModel.deadline.getFullYear();
    const mes = (formModel.deadline.getMonth() + 1).toString().padStart(2, '0');
    const dia = formModel.deadline.getDate().toString().padStart(2, '0');
    this.task.name = formModel.name;
    this.task.responsible = formModel.responsible;
    this.task.cpf = formModel.cpf;
    this.task.deadline = `${dia}-${mes}-${ano}`;
    this.task.isDone = false;
    this.task.status = "Aberta";
  }

  private createFormGroup() {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
        responsible: ['', [Validators.required]],
        deadline: ['', [Validators.required]],
      },
      {}
    );
  }
}

