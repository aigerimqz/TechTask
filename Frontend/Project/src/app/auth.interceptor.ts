import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access = this.authService.getToken();
    const isApiRequest = request.url.includes('taskily.onrender.com/api/');

    if (access && isApiRequest) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${access}`)
      });
      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}

