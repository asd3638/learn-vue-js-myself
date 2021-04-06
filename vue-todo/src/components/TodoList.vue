<template>
  <section>
    <transition-group name="list" tag="ul">
      <li
        v-for="(todoItem, index) in this.todoItems"
        class="shadow"
        v-bind:key="todoItem.item"
      >
        <i
          class="checkBtn fas fa-check"
          v-bind:class="{ checkBtnCompleted: todoItem.completed }"
          v-on:click="toggleComplete({ todoItem, index })"
        ></i>
        <span v-bind:class="{ textCompleted: todoItem.completed }">{{
          todoItem.item
        }}</span>
        <span class="removeBtn" v-on:click="removeTodo({ todoItem, index })">
          <i class="removeBtn fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  //원래 list 내에서 관리되던 todoItems를 root에서 선언하고 props로 내려보냈음.
  methods: {
    ...mapMutations({
      //인자인 payload는? 안보이지만 넘기고 있다.
      //실은 removeOneItem({todoItem, index})랑 같은거임
      removeTodo: "removeOneItem",
      toggleComplete: "toggleComplete",
    }),
  },
  computed: {
    //원래 그냥 ...mapGetters['storedTodoItems']하면 이름 똑같이 생성되는데
    //이름 굳이 바꾸고 싶으면 아래처럼 하면 된다.
    ...mapGetters({
      todoItems: "storedTodoItems",
    }),
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
/* 리스트 트랜지션 이펙트*/
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>