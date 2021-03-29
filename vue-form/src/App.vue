<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <input type="text" id="username" v-model="username">
    </div>
    <div>
      <!-- label 의 for이랑 input name 맞춰주면 label이랑 input은 한 쌍이 된다. -->
      <label for="password">pw: </label>
      <input type="password" id="password" v-model="password">
    </div>
    <button type="submit">login</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submitForm: function() {
      //submit type이 기본적으로 새로고침을 해서
      //event 받아서 새로고침 default를 없애.
      console.log(this.username, this.password);
      var url = 'https://jsonplaceholder.typicode.com/users';
      var data ={
        username: this.username,
        password: this.password,
      }
      axios.post(url, data)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
    }
  }
}
</script>

<style>

</style>