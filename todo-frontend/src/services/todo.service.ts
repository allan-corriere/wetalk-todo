import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from '../app/dto/create-todo.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/todo');
  }

  getTodo(uuid: string): Observable<Todo> {
    return this.http.get<Todo>(`/todo/${uuid}`);
  }

  createTodo(createTodoDto: CreateTodoDto): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:3000/todo', createTodoDto);
  }

  deleteTodo(uuid: string): Observable<any> {
    return this.http.delete(`/todo/${uuid}`);
  }
}
