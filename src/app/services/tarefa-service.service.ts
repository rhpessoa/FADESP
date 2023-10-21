import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { Task } from '../models/tarefa.model';
import { throwError } from 'rxjs';

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
    if (savedTasks) {
      return of(JSON.parse(savedTasks));
    }
    return this.http.get<Task[]>(this.apiUrl);
  }

  updateTask(task: Task): Observable<Task> {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = savedTasks.findIndex((t: Task) => t.id === task.id);
    if (index !== -1) {
      if (task.isDone) task.status = "Concluído";
      else {
        task.status = "Aberta";
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

  saveTask(task: Task): void {
    const savedTarefas = JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTarefas.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTarefas));
  }

  private loadAndSaveDataFromJson() {
    this.http.get<Task[]>(this.apiUrl).subscribe((data) => {
      localStorage.setItem('tasks', JSON.stringify(data));
    });
  }
}
