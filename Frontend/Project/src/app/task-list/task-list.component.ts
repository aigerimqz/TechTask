import { Component, OnInit } from '@angular/core';
import { Task } from '../../models';
import { TaskService } from '../services/task.service';
import { Router, RouterOutlet} from '@angular/router';
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
  editedTask: Task | null = null;
  originalTask: Task | null = null;
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
  startEditing(task: Task): void {
    this.originalTask = {...task};
    this.editedTask = {...task};
  }
  cancelEditing(): void {
    if (this.originalTask) {
      const index = this.tasks.findIndex(t => t.id === this.originalTask?.id);

      if (index !== -1) {
        this.tasks[index] = this.originalTask;
      }
    }
    this.editedTask = null;
    this.originalTask = null;
  }

  saveTask(): void {
    if (!this.editedTask) return;

    this.taskService.updateTask(this.editedTask.id, this.editedTask).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if(index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.editedTask = null;
        this.originalTask = null;
      },
      error: (err) => {
        console.error('Error updaing task', err);
        this.cancelEditing();
      }
    });
  }

  createTask():void {
    this.router.navigate([`/tasks/create`]);
  }

  editTask(id: number) {
    this.router.navigate([`/tasks/${id}/update`]);
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Error deleting task', err)
      });
    }
  }

  updateStatus(task: Task): void {
  if (!task || !task.id || task.status === undefined) {
    console.error('Invalid task data:', task);
    return;
  }

  const previousStatus = task.status;
  
  const updateData = {
    status: task.status
  };

  this.taskService.updateTask(task.id, updateData).subscribe({
    next: (updatedTask) => {
      console.log('Status updated successfully', updatedTask);
      Object.assign(task, updatedTask);
    },
    error: (err) => {
      console.error('Error updating status:', err);
      task.status = previousStatus;
      alert('Failed to update task status. Please try again.');
    }
  });
}



  
}
