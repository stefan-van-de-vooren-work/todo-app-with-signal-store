import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  value = input.required<Todo>();
  updateState = output<Todo['state']>();

  toggleTodoState() {
    if (this.value().state === 'open') {
      this.updateState.emit('completed');
    } else {
      this.updateState.emit('open');
    }
  }
}
