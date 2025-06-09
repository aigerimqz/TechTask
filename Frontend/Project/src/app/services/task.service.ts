import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from '../../models';
import { environment } from '../../environments/environment';
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private apiUrl = `https://taskily.onrender.com/api/tasks/`;
  
  constructor(private client: HttpClient  ) { }

  getTasks():Observable<Task[]>{
    return this.client.get<Task[]>(API_URL);
  }

  
  getTask(id: number): Observable<Task>{
    return this.client.get<Task>(`${API_URL}${id}/`);
  }

  createTask(formData: FormData): Observable<any> {
    
    return this.client.post(`${API_URL}create/`, formData);
  }

  // updateTask(id: number, postData: FormData): Observable<Task> {
  //   return this.client.put<Task>(`${this.apiUrl}${id}/update/`, postData);
  // }

  
  updateTask(id: number, data: any): Observable<Task> {
    return this.client.patch<Task>(`${API_URL}${id}/update/`, data).pipe(
      catchError(error => {
        console.error('Update task error:', error);
        return throwError(() => error);
      })
    );
  }

  deleteTask(id: number): Observable<any>{
    return this.client.delete(`${API_URL}${id}/delete/`);
  }
}
