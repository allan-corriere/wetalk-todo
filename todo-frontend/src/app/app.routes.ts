import { Routes } from '@angular/router';
import { TodoCreate } from './todo/create/todo-create.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';

export const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'todo/create', component: TodoCreate },
];
