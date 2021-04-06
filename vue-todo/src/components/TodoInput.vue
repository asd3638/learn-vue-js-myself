<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <span class="addContainer" v-on:click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>
    <Modal v-if="showModal" @close="showModal = false">
      <!--
      you can use custom content here to overwrite
      default content
    -->
      <!-- slot으로 정의되었던 header부분은 이처럼 상위 컴포넌트에서 원한다면 재정의할 수 있다. -->
      <h3 slot="header">warning!</h3>
      <h5 slot="body">무언가를 입력하세요</h5>
      <h5 slot="footer">copy right</h5>
    </Modal>
  </div>
</template>

<script>
import Modal from "./common/Modal.vue";

export default {
  data() {
    return {
      newTodoItem: "",
      showModal: false,
    };
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {
        //this.$emit("addTodoItem", this.newTodoItem);
        //이렇게 쓰면 addTodoItem이라는 이벤트를 발생시켰음을 의미하고
        //그걸 상위 컴포넌트와 v-on:(하위 컴포넌트에서 발생시킨 이벤트) 로 연결할 수 있다.
        //그럼 <v-on:(하위 컴포넌트에서 발생시킨 이벤트)="(상위컴포넌트에서 발생할 이벤트)"> 로 상위 컴포넌트의 특정 메소드를 호출해서 연결할 수 있다.
        this.$store.commit("addItem", this.newTodoItem);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.newTodoItem = "";
    },
  },
  components: {
    Modal,
  },

  Modal,
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>