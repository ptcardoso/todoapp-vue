<template>
    <header>
      <h1>todos</h1>
      <input v-model="todoTitle" v-on:keydown.enter="addTodo" autofocus="autofocus" autocomplete="off" placeholder="What needs to be done?" class="new-todo" />
      <button v-if="showSelectAll" v-on:click="onClickSelectAll" class="select-all"/>
    </header>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component({})
export default class TodoHeader extends Vue {
  todoTitle: string = ''

  @Prop() onInsert?: (todoTitle: string) => void
  @Prop() onSelectAll? : () => void
  @Prop() showSelectAll?: boolean;

  addTodo() {
    if (this.onInsert != null && this.todoTitle.length) {
      this.onInsert(this.todoTitle);
    }
    this.todoTitle = ''
  }

  onClickSelectAll() {
    if (this.onSelectAll) {
      this.onSelectAll();
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
}
h1 {
  color: #41B883;
  position: absolute;
  top: -140px;
  width: 100%;
  font-size: 100px;
  margin: 15px 0;
}
.select-all {
  width: 15px;
  height: 15px;
  border: solid #41B883;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
  position: absolute;
  top: 20px;
  transform: rotate(45deg);
  left: 24px;
  outline: none;
  background: none;
  cursor: pointer;
}
.new-todo {
  padding: 16px 16px 16px 60px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

  width: 100%;
  font-size: 24px;
  line-height: 1.4em;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.new-todo::placeholder {
  font-style: italic;
  opacity: 0.5;
}
</style>


