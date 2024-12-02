import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterState, TodoStore } from '@todo/todo';

@Component({
  selector: 'todo-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly store = inject(TodoStore);

  stateFilter = this.store.filter.state;
  stateFilterButtons: Array<FilterState> = ['open', 'completed', 'all'];

  setStateFilter(state: FilterState) {
    this.store.updateStateFilter(state);
  }
}
