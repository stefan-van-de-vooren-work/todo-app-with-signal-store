import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import type { Todo, TodoState } from './todo.model';

export type FilterState = TodoState | 'all';

type TodosState = {
  todos: Todo[];
  filter: { query: string; state: FilterState };
  isLoading: boolean;
  error: string | null;
};

const initialState: TodosState = {
  todos: [],
  filter: { query: '', state: 'all' },
  isLoading: false,
  error: null,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    todosCount: computed(() => state.todos().length),
    filtered: computed(() => {
      const queryFilter = state.filter().query;
      const stateFilter = state.filter().state;
      return state
        .todos()
        .filter((todo) =>
          todo.title.toLowerCase().includes(queryFilter.toLowerCase())
        )
        .filter((todo) => stateFilter === 'all' || todo.state === stateFilter);
    }),
  })),
  withMethods((store) => ({
    updateQueryFilter(query: string): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    updateStateFilter(stateFilter: FilterState): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, state: stateFilter },
      }));
    },
    addTodo: (todo: string) => {
      patchState(store, (state) => {
        const newTodo: Todo = {
          id: Math.random().toString(36),
          title: todo,
          state: 'open',
        };
        return {
          todos: [...state.todos, newTodo],
        };
      });
    },
    deleteTodo: (todo: Todo) => {
      console.log('delete todo', todo);
    },
    updateTodoState: (id: string, todoState: TodoState) => {
      console.log('mark todo as completed', id, todoState);
      patchState(store, (state) => ({
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, state: todoState };
          } else {
            return todo;
          }
        }),
      }));
    },
  })),
  withHooks({
    onInit(store) {
      const http = inject(HttpClient);
      patchState(store, () => ({ isLoading: true }));
      http.get<Todo[]>('http://localhost:3000/todos').subscribe({
        next: (response) => {
          patchState(store, () => ({ isLoading: false, todos: response }));
        },
        error: (error) => {
          patchState(store, () => ({ isLoading: false, error: error.message }));
          console.error(
            'Error fetching todos. Start mock server with `npm run server`'
          );
        },
      });
    },
  })
);
