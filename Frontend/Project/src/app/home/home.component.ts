import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TaskListComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
