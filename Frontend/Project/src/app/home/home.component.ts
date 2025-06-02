import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';
import { AuthService } from '../services/auth.service';
import { User } from '../../models';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, CreateTaskComponent, TaskListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  currentUser: User | null = null;
  showCreateForm = false;

  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  onTaskCreated() {
    this.showCreateForm = false;

    if(this.taskListComponent) {
      this.taskListComponent.loadTasks();
    }
  }
}
