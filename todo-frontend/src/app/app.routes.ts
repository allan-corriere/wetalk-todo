import { Routes } from '@angular/router';
import { TodoCreate } from './todo/create/todo-create.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { TodosComponent } from './todo/todos/todos.component';

export const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'todo/create', component: TodoCreate },
];
