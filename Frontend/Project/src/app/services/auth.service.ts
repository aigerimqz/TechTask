import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, User } from '../../models';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `https://taskily.onrender.com/api/`;
  constructor(private client: HttpClient) { }

  
  login(userModel: User): Observable<Token> {
  return new Observable(observer => {
    this.client.post<Token>(`${this.apiUrl}login/`, userModel).subscribe({
      next: (token) => {
        localStorage.setItem('token', token.access);

        
        this.client.get<User>(`${this.apiUrl}profile/`, {
          headers: {
            Authorization: `Bearer ${token.access}`
          }
        }).subscribe({
          next: (user) => {
            localStorage.setItem('currentUser', JSON.stringify(user)); 
            observer.next(token);
            observer.complete();
          },
          error: err => {
            console.error('Ошибка при получении профиля', err);
            observer.error(err);
          }
        });
      },
      error: err => observer.error(err)
    });
  });
}


  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }
  getCurrentUser(): User | null{
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user): null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  register(userData: any): Observable<any> {
    return this.client.post(`${this.apiUrl}register/`, userData).pipe(
      map(response => {
  
        return response;
      }),
      catchError(error => {
       
        if (error.status === 201) {
          return of(error.error); 
        }
        return throwError(() => error);
      })
    );
  }
}
