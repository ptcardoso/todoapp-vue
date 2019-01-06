<template>
    <footer class="todo-list-footer">
        <span class="todo-counter">{{remainingTodos}} items left</span>
        <ul class="todo-list-filters">
          <li><router-link to="/">All</router-link></li>
          <li><router-link to="/active/">Active</router-link></li>
          <li><router-link to="/completed/">Completed</router-link></li>
        </ul>
        <span class="clear-completed" v-on:click="onClearCompleted()">Clear completed</span>
      </footer>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Todo, TodoState} from '../models/todo'

@Component({})
export default class TodoFooter extends Vue {
    @Prop({default: []}) todos!: Todo[];
    @Prop() onClearCompleted!: () => void;

    get remainingTodos(): number {
        return this.todos.filter(t => !t.isDone).length;
    }
}
</script>

<style lang="scss" scoped>
.todo-list-footer {
  color: #777;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.todo-list-filters {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}
.todo-list-filters a {
  text-decoration: none;
  color: #777;
  border: 1px solid transparent;
  padding: 3px 10px;
  border-radius: 2px;
}
.todo-list-filters a.selected, .todo-list-filters a:hover {
  border-color:#41B883;
}
.todo-list-filters li {
  padding: 0 8px;
}
.clear-completed:hover {
  text-decoration: underline;
  cursor: pointer;
}
.clear-completed.hidden {
  visibility: hidden;
}
</style>


