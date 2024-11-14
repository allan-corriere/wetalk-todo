import { Component, Input } from '@angular/core';

@Component({
  selector: 'todo-list-item',
  standalone: true,
  templateUrl: './todo-list-item.component.html',
})
export class TodoListItemComponent {
  @Input() todoTitle = '';
  @Input() todoDescription = '';
}
