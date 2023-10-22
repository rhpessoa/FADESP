import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../models/tarefa.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { NovaTarefaFormService } from './nova-tarefa-form/nova-tarefa-form.service';
import { ConfirmService } from '../confirm-component/confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TarefaService } from '../../services/tarefa.service';
import { SnackbarService } from '../../services/snackbar.service';


@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.css']
})

export class TarefaListaComponent implements OnInit {
  displayedColumns: string[] = ['isDone', 'name', 'cpf', 'responsible', 'deadline', 'status', 'deleteTask'];
  dataSource!: MatTableDataSource<Task>;
  noDataFound: boolean = true;
  form!: FormGroup;
  statusOptions: string[] = ['concluido', 'aberta', 'expirada'];
  private currentDate: Date = new Date();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private tarefaService: TarefaService,
    private novaTarefaFormService: NovaTarefaFormService,
    private confirmService: ConfirmService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {
    this.form = this.fb.group({
      status: ['']
    });
  }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página:';
    this.paginator._intl.nextPageLabel = 'Próxima';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.loadData();
  }

  private loadData() {
    this.tarefaService.getTasks()
      .subscribe(tasks => {
        if (tasks) {
          this.noDataFound = (tasks === null || tasks.length === 0);
          this.dataSource = new MatTableDataSource(tasks);
          this.dataSource.paginator = this.paginator;
        }
      })
  }

  itemActionDeleteClick(taskId: string) {
    this.confirmService.activate("Você tem certeza que quer excluir essa tarefa?")
      .then((confirmed: boolean) => {
        if (confirmed) {
          this.tarefaService.deleteTask(taskId);
          this.loadData();
          this.snackbarService.showSuccessMessage("A tarefa foi deletada com sucesso!");
        }
      });
  }

  onCheckboxChange(event: MatCheckboxChange, task: Task): void {
    let message = task.isDone
      ? 'Essa tarefa está marcada com status de concluída. Você tem certeza que quer alterar o status para não concluída?'
      : "Você tem certeza que quer alterar o status da tarefa para concluída?";
    this.confirmService.activate(message)
      .then((confirmed: boolean) => {
        if (confirmed) {
          task.isDone = event.checked;
          this.tarefaService.updateTask(task)
            .subscribe(updatedTask => {
              if (updatedTask) {
                this.snackbarService.showSuccessMessage("Alteração no status da tarefa foi realizada com sucesso!");
              }
            });
        }
        else {
          this.loadData();
        }
      });
  }

  public getStatusClass(status: string) {
    const classList = {
      'finish': status === 'concluido',
      'open': status === 'aberta',
      'expired': status === 'expirada',
    };
    return classList;
  }

  translateStatus(status: string): string {
    if (status === 'concluido') {
      return 'Concluído';
    } else if (status === 'aberta') {
      return 'Aberta';
    } else if (status === 'expirada') {
      return 'Expirada';
    } else {
      return status;
    }
  }

  formatCPF(cpf: string): string {
    if (cpf && cpf.length === 11) {
      return cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6, 9) + '-' + cpf.slice(9);
    }
    return cpf;
  }

  private isDeadlineExpired(deadline: string): boolean {
    const deadlineDate: Date = new Date(deadline);
    return deadlineDate < this.currentDate;
  }

  onStatusChange(event: MatSelectChange): void {
    this.dataSource.filter = (event.value);
  }

  openNewTask() {
    this.novaTarefaFormService.showDialog('')
      .subscribe((result) => {
        this.loadData();
    })
  }
  
}
