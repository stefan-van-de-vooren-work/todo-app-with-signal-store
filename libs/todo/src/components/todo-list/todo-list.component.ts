import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { TodoStore } from '../../model/todos.store';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'lib-todo-list',
  standalone: true,
  imports: [CommonModule, JsonPipe, TodoItemComponent],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  readonly store = inject(TodoStore);

  updateState(newState: Todo['state'], todoId: string) {
    this.store.updateTodoState(todoId, newState);
  }
}
