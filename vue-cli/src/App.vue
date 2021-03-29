<template>
<!-- 탬플릿에서 root 태그는 딱 하나만 존재 해야 한다. -->
<!-- 같은 계층으로 dir 여러개 만들면 안된다. -->
  <div>
    <app-header 
    v-bind:propsdata="header"
    v-on:renew="renewStr"></app-header>
  </div>
</template>

<script>
//원래 객체로 var 로 저장했던 것을 파일로 저장해서 가져왔다는 차이밖에 없다.
import AppHeader from './components/AppHeader.vue';

// new Vue 랑은 달리 컴포넌트를 재사용할 수 있다는 점이 강조됨.
// data에 값을 직접 할당하는 건 아니고 function return으로 한번 더 거쳐감
export default {
  //new Vue 였을 때랑은 차이가 있음.
  data: function() {
    return {
      header: 'header!',
    }
  },
  components: {
    'app-header': AppHeader,
  },
  methods: {
    renewStr: function() {
      this.header = "renewedHeader!";
    }
  }
}
</script>

<style>

</style>