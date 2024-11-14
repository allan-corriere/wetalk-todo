import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from '../dto/create-todo.dto';
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
    return this.http.get<Todo>(`http://localhost:3000/todo/${uuid}`);
  }

  updateTodo(uuid: string, updateTodo: any): Observable<Todo> {
    return this.http.patch<Todo>(
      `http://localhost:3000/todo/${uuid}`,
      updateTodo
    );
  }

  createTodo(createTodoDto: CreateTodoDto): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:3000/todo', createTodoDto);
  }

  deleteTodo(uuid: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/todo/${uuid}`);
  }
}
