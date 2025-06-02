import { Component, OnInit } from '@angular/core';
import { Task } from '../../models';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  tasks: Task[] = [];
  isLoading = true;
  constructor(
    private taskService: TaskService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.loadTasks();

  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading tasks', err);
        this.isLoading = false;
      }
    })
  }

  // viewTaskDetail(id: number): void{
  //   this.router.navigate(['/tasks/', id]);
  // }

  createTask():void {
    this.router.navigate(['/tasks/create']);
  }

  editTask(id: number) {
    this.router.navigate(['/tasks/${id}/update']);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    })
  }

  updateStatus(task: Task): void {
  const formData = new FormData();
  formData.append('title', task.title);
  formData.append('description', task.description);
  formData.append('status', task.status);

  formData.append('user', task.user.id.toString());

  this.taskService.updateTask(task.id, formData).subscribe({
    next: () => console.log('Status updated'),
    error: (err) => console.error('Error on updating', err)
  });
}



  
}
