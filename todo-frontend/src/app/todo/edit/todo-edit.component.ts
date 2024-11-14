import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../../entities/todo.entity';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../../services/todo.service';
import { AsyncPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UpdateTodoDto } from '../../dto/update-todo.dto';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './todo-edit.component.html',
})
export class TodoEdit {
  todo$: Observable<Todo> | undefined;

  uuid: string | undefined;

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

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.uuid = this.route.snapshot.paramMap.get('uuid')!;
    this.todo$ = this.todoService.getTodo(this.uuid);
    this.todo$.subscribe((todo) => {
      this.todoForm.patchValue({ ...todo });
    });
  }

  onSubmit() {
    const updateTodoDto: UpdateTodoDto = {
      title: this.todoForm.value.title!,
      description: this.todoForm.value.description!,
    };
    this.todoService.updateTodo(this.uuid!, updateTodoDto).subscribe((todo) => {
      console.log(todo);
    });
  }
}
