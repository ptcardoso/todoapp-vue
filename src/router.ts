import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import TodoList from './views/TodoList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'todolist-all',
          component: TodoList,
          props: { filter: null }
        },
        {
          path: 'active/',
          name: 'todolist-active',
          component: TodoList,
          props: { filter: 'active' }
        },
        {
          path: 'completed/',
          name: 'todolist-completed',
          component: TodoList,
          props: { filter: 'completed' }
        }
      ]
    }
  ],
});
