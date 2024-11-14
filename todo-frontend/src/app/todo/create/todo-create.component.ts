import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-create.component.html',
})
export class TodoCreate {
  titleFormControl = new FormControl('');
}
