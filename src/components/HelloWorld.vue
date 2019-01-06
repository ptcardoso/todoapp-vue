<template>
<div>
  <section class="todoapp">
    <TodoHeader v-bind:show-select-all="showSelectAll" :on-select-all="onSelectAll" :on-insert="addTodo"/>
    <section class="main">
      <router-view/>
      <TodoFooter v-bind:todos="todos" :on-clear-completed="clearCompleted" />
    </section>
  </section>
  <footer class="app-footer">
    <p>Double-click to edit a todo</p>
    <p>Written by Pedro Cardoso</p>
  </footer>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodoHeader from './TodoHeader.vue';
import TodoFooter from './TodoFooter.vue';
import {Todo, TodoState} from '../models/todo';
import TodoStore, {TodoStoreUpdatedEvent} from '../stores/todos';
import {EventBus} from '../stores/eventBus';

@Component({
  components: {
    TodoHeader,
    TodoFooter
  }
})
export default class HelloWorld extends Vue {
  showSelectAll: boolean = true;
  todos: Todo[] = [];

  created() {
    this.updateTodos();
    EventBus.$on(TodoStoreUpdatedEvent, this.updateTodos)
  }

  beforeDestroy() {
    EventBus.$off(TodoStoreUpdatedEvent, this.updateTodos)
  }

  updateTodos() {
    this.todos = TodoStore.todos;
  }

  onDestroyTodo(todo: Todo) {
    TodoStore.removeTodo(todo);
  }

  addTodo(title: string) {
    TodoStore.addTodo(title);
  }

  clearCompleted() {
    TodoStore.clearCompleted();
  }

  onSelectAll() {
    const allDone = this.todos.filter(t => !t.isDone).length === 0;
    TodoStore.apply(t => t.isDone = !allDone)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.todoapp {
  position: relative;
  margin-top: 140px;
  background: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.app-footer {
  margin-top: 35px;
  font-size: 12px;
  color: #bfbfbf;
}
</style>
