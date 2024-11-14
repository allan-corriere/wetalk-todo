import { Routes } from '@angular/router';
import { TodoCreate } from './todo/create/todo-create.component';
import { TodosComponent } from './todo/todos/todos.component';
import { TodoEdit } from './todo/edit/todo-edit.component';

export const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'todo/create', component: TodoCreate },
  { path: 'todo/edit/:uuid', component: TodoEdit },
];
