import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

export interface Task {
  id?: string;
  title: string;
  description?: string;
  createdAt: string;
  completed: boolean;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly apiService: ApiService) { }

  getTasks(completed?: boolean): Observable<Task[]> {
    let params = new HttpParams();
    if (completed !== undefined) {
      params = params.set('completed', completed.toString());
    }
    return this.apiService.get<Task[]>('/tasks', params);
  }

  getTask(id: string): Observable<Task> {
    return this.apiService.get<Task>(`/tasks/${id}`);
  }

  createTask(task: Task): Observable<{ id: string, message: string }> {
    return this.apiService.post<{ id: string, message: string }>('/tasks', task);
  }

  updateTask(id: string, task: Partial<Task>): Observable<{ message: string }> {
    return this.apiService.put<{ message: string }>(`/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<{ message: string }> {
    return this.apiService.delete<{ message: string }>(`/tasks/${id}`);
  }
}