import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoStore } from '../../model/todos.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo-feature.component.html',
})
export class AddTodoFeatureComponent {
  readonly store = inject(TodoStore);

  onEnter(inputElement: HTMLInputElement) {
    this.store.addTodo(inputElement.value);
    inputElement.value = '';
  }
}
