import { Component } from '@angular/core';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { Todo } from '../../entities/todo.entity';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoListItemComponent],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  todoList: Todo[] = [
    {
      title: 'Faire les courses 1',
      description: 'Blablabla',
      uuid: '31cbc33e-2662-4824-8f9a-ee0732baa5de',
    },
    {
      title: 'Faire les courses 2',
      description: 'Blablabla',
      uuid: '31cbc33e-2662-4824-8f9a-ee0732baa5df',
    },
    {
      title: 'Faire les courses 3',
      description: 'Blablabla',
      uuid: '31cbc33e-2662-4824-8f9a-ee0732baa5da',
    },
    {
      title: 'Faire les courses 4',
      description: 'Blablabla',
      uuid: '31cbc33e-2662-4824-8f9a-ee0732baa5db',
    },
  ];
}
