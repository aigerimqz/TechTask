import { Component, OnInit } from '@angular/core';
import { Task } from '../../models';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
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


  
}
