import {Todo} from '../models/todo'
import {EventBus} from './eventBus'

export const TodoStoreUpdatedEvent = 'todos.updated';
class TodosStore {
    todos: Todo[] = []

    addTodo(title: string) {
        this.todos.unshift(new Todo({title}));
        EventBus.$emit(TodoStoreUpdatedEvent, this);
    }

    removeTodo(todo: Todo) {
        this.todos = this.todos.filter(t => t.id !== todo.id)
        EventBus.$emit(TodoStoreUpdatedEvent, this);
    }

    updateTodo(todo: Todo) {
        const index = this.todos.findIndex(t => t.id == todo.id)
        if (index > -1) {
            this.todos[index] = todo;
            EventBus.$emit(TodoStoreUpdatedEvent, this);
        }
    }

    apply(change: (t: Todo) => void) {
        this.todos.forEach(t => change(t));
        EventBus.$emit(TodoStoreUpdatedEvent, this);
    }

    clearCompleted() {
        this.todos = this.todos.filter(t => !t.isDone);
        EventBus.$emit(TodoStoreUpdatedEvent, this);
    }
}

export default new TodosStore();
