import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:8000/api/tasks/';
  constructor(private client: HttpClient  ) { }

  getTasks():Observable<Task[]>{
    return this.client.get<Task[]>(this.apiUrl);
  }

  getTask(id: number):Observable<Task>{
    return this.client.get<Task>(`${this.apiUrl}${id}/`);
  }

  createTask(formData: FormData):Observable<any> {
    return this.client.post(`${this.apiUrl}/tasks/`, formData);
  }
  
  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.client.patch<Task>(`${this.apiUrl}/tasks/${id}/`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}/`);
  }
}
