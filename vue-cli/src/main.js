import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
//$mount는 원래 했었던 el: '#app'이랑 같은 역할 render만 추가된 것임.
//render은 template이랑 연관된 함수라고 알면 된다.
