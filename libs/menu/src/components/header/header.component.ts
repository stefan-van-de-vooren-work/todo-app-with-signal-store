import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoStore } from '@todo/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'todo-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly store = inject(TodoStore);

  queryFilter = this.store.filter.query;

  updateQueryFilter(query: string) {
    this.store.updateQueryFilter(query);
  }
}
