import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {path: '', component: TaskListComponent},
            {path: 'tasks', component: TaskListComponent},
            {path: 'tasks/create', component: CreateTaskComponent},
            {path: 'tasks/:id/update', component: UpdateTaskComponent},
            {path: 'tasks/:id', component: TaskDetailComponent},
        ]
    },
    {path: 'login', component: AuthComponent},
    {path: 'register', component: RegisterComponent},
    
];
