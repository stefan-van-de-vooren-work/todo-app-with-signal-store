import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { AddTodoFeatureComponent } from '../add-todo/add-todo-feature.component';

@Component({
  selector: 'lib-todo-feature',
  standalone: true,
  imports: [CommonModule, TodoListComponent, AddTodoFeatureComponent],
  templateUrl: './todo-feature.component.html',
})
export class TodoFeatureComponent {}
