import { Component, Input } from '@angular/core';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { Todo } from '../../entities/todo.entity';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoListItemComponent, RouterLink],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input() todoList: Todo[] = [];
}
