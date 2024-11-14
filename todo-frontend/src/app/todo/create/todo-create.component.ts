import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../../services/todo.service';
import { CreateTodoDto } from '../../dto/create-todo.dto';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-create.component.html',
})
export class TodoCreate {
  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),
      ],
    }),
    description: new FormControl('', [Validators.maxLength(255)]),
  });

  constructor(private todoService: TodoService) {}

  onSubmit() {
    const createTodoDto: CreateTodoDto = {
      title: this.todoForm.value.title!,
      description: this.todoForm.value.description!,
    };
    this.todoService.createTodo(createTodoDto).subscribe((todo) => {
      console.log(todo);
    });
  }
}
