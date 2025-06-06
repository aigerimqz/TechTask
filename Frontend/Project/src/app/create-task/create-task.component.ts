import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Task } from '../../models';
import { TaskService } from '../services/task.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  task: Partial<Task> = {
    title: '',
    description: '',
    status: 'todo'
  };

  @Output() taskCreated = new EventEmitter<void>();
  constructor(private taskService: TaskService, private router: Router) {}

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('access');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  onSubmit(): void {
    const userId = this.getUserIdFromToken();
    if (!userId) {
      alert('User is not authorized');
      return;
    }

    const newTask: any = {
      ...this.task,
      user: userId
    };

    this.taskService.createTask(newTask).subscribe({
      next: () => {
        this.taskCreated.emit();
      },
      error: err => console.error('Error on creating task', err)
    });
  }
}
