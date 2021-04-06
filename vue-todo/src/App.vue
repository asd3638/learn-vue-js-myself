<template>
  <dir id="app">
    <todo-header></todo-header>
    <todo-input v-on:addTodoItem="addOneItem"></todo-input>
    <todo-list
      v-bind:propsdata="todoItems"
      v-on:removeTodoItem="removeOneItem"
      v-on:toggleComplete="toggleComplete"
    ></todo-list>
    <todo-footer v-on:clearItems="clearItems"></todo-footer>
  </dir>
</template>

<script>
//./components/TodoHeader.vue 파일 내용을 모두 읽어 TodoHeader에 담겠다는 뜻이다.
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  name: "App",
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  },

  created() {
    if (localStorage.length !== 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
  },
  data() {
    return {
      todoItems: [],
    };
  },
  methods: {
    //이런 속성 메소드를 쓰면 간결하게 줄일 수 있다.
    // addOneItem: function(newTodoItem) {
    //   const obj = { completed: false, item: newTodoItem };
    //   localStorage.setItem(newTodoItem, JSON.stringify(obj));
    //   this.todoItems.push(obj);
    // },
    addOneItem(newTodoItem) {
      const obj = { completed: false, item: newTodoItem };
      localStorage.setItem(newTodoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleComplete(todoItem, index) {
      this.todoItems[index].completed = !this.todoItems[index].completed;
      //localstorage는 update하는 api는 없기 때문에 지웠다가 다시 저장하는 방식 사용.
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearItems() {
      this.todoItems = [];
      localStorage.clear();
    },
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

