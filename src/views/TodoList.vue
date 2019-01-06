<template>
    <ul class="todo-list">
        <li v-for="(item, index) in todos" :key="index" class="todo">
          <div v-if="!editing || item.id !== editing.id">
            <label class="toggle-container">
              <input type="checkbox" class="toggle" v-model="item.isDone"/>
              <span class="checkmark"/>
            </label>
            <label class="todo-label" v-on:dblclick="onEditTodo(item)" v-bind:class="{ done: item.isDone }" >{{item.title}}</label>
            <button class="destroy" v-on:click="onDestroy(item)"/>
          </div>
          <div v-else>
            <label class="toggle-container">
              <input type="checkbox" class="toggle"/>
              <span class="checkmark"/>
            </label>
            <input type="text" v-on:blur="onCancelEditTodo()" class="edit-label" v-on:keydown.enter="updateTodo(item, $event)" :value="item.title"/>
          </div>
        </li>
      </ul>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Todo, TodoState} from '../models/todo';
import {EventBus} from '../stores/eventBus';
import TodoStore, {TodoStoreUpdatedEvent} from '../stores/todos';

@Component({})
export default class TodoList extends Vue {
    todos: Todo[] = [];
    editing: Todo|null = null;
    @Prop() filter?: string;
    
    created() {
      this.updateTodos();
      EventBus.$on(TodoStoreUpdatedEvent, this.updateTodos)
    }

    beforeRouteEnter (to: any, from: any, next: (v?: any) => void) {
      next((vm: TodoList) => {
        vm.updateTodos()
        next();
      });
    }

    beforeDestroy() {
      EventBus.$off(TodoStoreUpdatedEvent, this.updateTodos)
    }

    updateTodos() {
      if (this.filter === 'completed') {
        this.todos = TodoStore.todos.filter(t => t.isDone);
      } else if (this.filter === 'active') {
        this.todos = TodoStore.todos.filter(t => !t.isDone);
      } else {
        this.todos = TodoStore.todos;
      }
    }

    onDestroy(todo: Todo) {
      TodoStore.removeTodo(todo);
    }

    onEditTodo(todo: Todo) {
      this.editing = todo;
    }

    onCancelEditTodo() {
      this.editing = null;
    }

    updateTodo(todo: Todo, event: any) {
      TodoStore.updateTodo(new Todo({
        id: todo.id,
        state: todo.state,
        title: event.target.value as string
      }));
      this.editing = null;
    }
}
</script>

<style lang="scss" scoped>
.todo-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.todo {
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  line-height: 1.4em;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
.todo-label {
  padding: 16px 16px 16px 44px;
  width: 100%;
  text-align: left;
  &.done {
      text-decoration: line-through;
      color: #ccc;
  }
}
.edit-label {
  padding: 16px;
  margin-left: 44px;
  width: 100%;
  outline: none;
  font-size: 24px;
}
.toggle-container {
  position: relative;
  display: block;
  user-select: none;
  display: block;
  height: 35px;
  margin-left: 16px;
}
.toggle {
  position: absolute;
  cursor: pointer;
  opacity: 0;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: #eee;
}
.checkmark:hover {
  background-color: #ccc;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.todo .toggle:checked ~ .checkmark:after {
  display: block;
}
.checkmark:after {
  left: 12px;
  top: 7px;
  width: 7px;
  height: 14px;
  border: solid #41B883;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
.destroy {
  position: absolute;
  right: 16px;
  display: none;
  background: transparent;
  border: 0;
  outline: 0;
}
.todo:hover .destroy {
  display: block;
  
}
.todo:hover .destroy::after {
  content: "X";
  font-weight: 600;
  cursor: pointer;
}
.destroy:hover {
  color: red;
}
</style>


