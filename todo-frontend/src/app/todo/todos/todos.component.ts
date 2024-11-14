import { Component } from '@angular/core';
import { TodoListComponent } from '../../../components/todo-list/todo-list.component';
import { Observable } from 'rxjs';
import { Todo } from '../../../entities/todo.entity';
import { TodoService } from '../../../services/todo.service';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [TodoListComponent, AsyncPipe],
  templateUrl: './todos.component.html',
})
export class TodosComponent {
  todos$!: Observable<Todo[]>;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
  }
}
