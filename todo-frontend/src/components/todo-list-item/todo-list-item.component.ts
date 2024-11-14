import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-list-item',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './todo-list-item.component.html',
})
export class TodoListItemComponent {
  @Input() todoTitle = '';
  @Input() todoDescription = '';
  @Input() todoUuid = '';

  faTrash = faTrash;

  constructor(private todoService: TodoService) {}

  showModal() {
    if (document) {
      (document.getElementById(`modal_${this.todoUuid}`) as HTMLFormElement)[
        'showModal'
      ]();
    }
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todoUuid).subscribe((todo) => {});
  }
}
