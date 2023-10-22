import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { NovaTarefaFormService } from './nova-tarefa-form/nova-tarefa-form.service';

@Component({
  selector: 'app-tarefa-lista-component',
  templateUrl: './tarefa-lista-component.component.html',
  styleUrls: ['./tarefa-lista-component.component.css']
})
export class TarefaListaComponentComponent implements OnInit {
  displayedColumns: string[] = ['isDone', 'name', 'cpf', 'responsible', 'deadline', 'status', 'deleteTask'];
  dataSource!: MatTableDataSource<Task>;
  noDataFound: boolean = true;
  form!: FormGroup;
  statusOptions: string[] = ['Concluído', 'Aberta', 'Expirada'];
  private currentDate: Date = new Date();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private tarefaService: TarefaService,
    private novaTarefaFormService: NovaTarefaFormService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      status: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.tarefaService.getTasks()
      .subscribe(tasks => {
        if (tasks) {
          console.log(tasks);
          this.noDataFound = (tasks === null || tasks.length === 0);
          this.dataSource = new MatTableDataSource(tasks);
          this.dataSource.paginator = this.paginator;
        }
      })
  }

  itemActionDeleteClick(taskId: string) {
    this.tarefaService.deleteTask(taskId);
    this.loadData();
  }

  onCheckboxChange(event: MatCheckboxChange, task: Task): void {
    task.isDone = event.checked;
    this.tarefaService.updateTask(task).subscribe(updatedTask => {
      console.log(updatedTask);
    });
  }

  public getStatusClass(status: string) {
    const classList = {
      'finish': status === 'Concluído',
      'open': status === 'Aberta',
      'expired': status === 'Expirada',
    };
    return classList;
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
