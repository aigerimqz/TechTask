import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-update-task',
  imports: [],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {

  constructor(private taskService: TaskService){}

}
