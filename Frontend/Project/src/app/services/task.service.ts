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

  
  getTask(id: number): Observable<Task>{
    return this.client.get<Task>(`${this.apiUrl}${id}/`);
  }

  createTask(formData: FormData): Observable<any> {
    
    return this.client.post(`${this.apiUrl}create/`, formData);
  }

  updateTask(id: number, postData: FormData): Observable<Task> {
    return this.client.put<Task>(`${this.apiUrl}${id}/update/`, postData);
  }

  deleteTask(id: number): Observable<any>{
    return this.client.delete(`${this.apiUrl}${id}/delete/`);
  }
}
