import { Component, Input } from '@angular/core';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { Todo } from '../../entities/todo.entity';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoListItemComponent],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input() todoList: Todo[] = [];
}
