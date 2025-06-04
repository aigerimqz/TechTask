import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {path: '', component: TaskListComponent, canActivate: [authGuard]},
            {path: 'tasks', component: TaskListComponent, canActivate: [authGuard]},
            {path: 'tasks/create', component: CreateTaskComponent, canActivate: [authGuard]},
            {path: 'tasks/:id/update', component: UpdateTaskComponent, canActivate: [authGuard]},
            
        ]
    },
    {path: 'login', component: AuthComponent},
    {path: 'register', component: RegisterComponent},
    
];
