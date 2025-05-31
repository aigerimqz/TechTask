import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: AuthComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'tasks', component: TaskListComponent}
];
