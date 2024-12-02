import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { type Todo } from './todo.model';

export type TodoState = Todo['state'];
export type FilterState = TodoState | 'all';

type TodosState = {
  todos: Todo[];
  filter: { query: string; state: FilterState };
  isLoading: boolean;
  error: string | null;
};

const initialState: TodosState = {
  todos: [
    {
      id: '1',
      title: 'Angular',
      description: 'Learn how Angular works',
      state: 'open',
    },
    {
      id: '2',
      title: 'Signal store',
      description: 'Learn the NgRx Signal Store works',
      state: 'completed',
    },
  ],
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
      console.log('Add todo', todo);
      patchState(store, (state) => {
        const newTodo: Todo = {
          id: Math.random().toString(36),
          title: todo,
          description: 'Learn how Angular works',
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
  }))
);
