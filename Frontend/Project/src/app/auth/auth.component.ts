import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../../models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  userModel: User;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ){
    this.userModel = {} as User;
  }

  onLogin(): void{
    this.authService.login(this.userModel).subscribe({
      next: (token) => {
        localStorage.setItem('access', token.access);
        localStorage.setItem('refresh', token.refresh);
        this.router.navigate(['/']);
        
      },
      error: () => {
        this.errorMessage = 'Wrong username or password';
      }
    })
  }
}
