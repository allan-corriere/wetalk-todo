import { Component } from '@angular/core';
import { TodoListComponent } from '../../../components/todo-list/todo-list.component';
import { Observable } from 'rxjs';
import { Todo } from '../../../entities/todo.entity';
import { TodoService } from '../../../services/todo.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  imports: [TodoListComponent, AsyncPipe, RouterLink, FontAwesomeModule],
  templateUrl: './todos.component.html',
})
export class TodosComponent {
  todos$!: Observable<Todo[]>;
  faPlus = faPlus;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
  }
}
