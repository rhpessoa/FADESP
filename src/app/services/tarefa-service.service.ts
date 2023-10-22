import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { Task } from '../models/tarefa.model';
import { throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private apiUrl = 'assets/data.json';

  constructor(private http: HttpClient)
  {
    const savedTask = localStorage.getItem('tasks');
    if (!savedTask) {
      this.loadAndSaveDataFromJson();
    }
  }

  getTasks(): Observable<Task[]> {
    const savedTasks = localStorage.getItem('tasks');
    const tasksObservable = savedTasks
      ? of(JSON.parse(savedTasks) as Task[])
      : this.http.get<Task[]>(this.apiUrl);
    return tasksObservable.pipe(
      map((tasks: Task[]) => {
        const currentDate = new Date();
        tasks.forEach((task: Task) => {
          const deadlineDate = new Date(task.deadline);
          if (this.isDeadlineExpired(deadlineDate, currentDate)) {
            task.status = 'expirada';
          }
        });
        return tasks;
      })
    );
  }



  private isDeadlineExpired(deadline: Date, currentDate: Date): boolean {
    const deadlineDate: Date = new Date(deadline);
    return deadlineDate < currentDate;
  }

  updateTask(task: Task): Observable<Task> {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = savedTasks.findIndex((t: Task) => t.id === task.id);
    if (index !== -1) {
      if (task.isDone) {
        task.status = "concluido"
      }
      else {
        const currentDate = new Date();
        const deadlineDate = new Date(task.deadline);
        if (this.isDeadlineExpired(deadlineDate, currentDate)) {
          task.status = 'expirada';
        } else {
          task.status = 'aberta';
        }
      }
      savedTasks[index] = task;
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
      return of(task);
    }
    return throwError('Tarefa não encontrada');
  }

  deleteTask(id: string): void {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = savedTasks.findIndex((t: Task) => t.id === id);
    if (index !== -1) {
      savedTasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
  }

  saveTask(task: Task): Observable<boolean> {
    const taskId = uuidv4();
    task.id = taskId;
    const savedTarefas = JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTarefas.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTarefas));
    return new Observable((observer) => {
      observer.next(true);
      observer.complete();
    });
  }


  private loadAndSaveDataFromJson() {
    this.http.get<Task[]>(this.apiUrl).subscribe((data) => {
      localStorage.setItem('tasks', JSON.stringify(data));
    });
  }
}
