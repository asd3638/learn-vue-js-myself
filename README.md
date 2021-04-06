# vue.js 개념 공부 & todoList clone coding


### todoList 결과물
![vue js_todoList](https://user-images.githubusercontent.com/59568523/113684356-1b5ff600-9700-11eb-8238-c04205c3c057.gif)

### 학습 목차

1. Reactivity
2. Instance
3. Component
4. http 통신 : axios
5. data binding & view directive
6. vue-cli
7. ES5 / ES6
8. Vuex (state, getters, mutations, actions, modules)

### vue.js 공식 문서들

[Introduction - Vue.js](https://vuejs.org/v2/guide/)

[Vue Router](https://router.vuejs.org/)

[Vue CLI](https://cli.vuejs.org/)

[What is Vuex? | Vuex](https://vuex.vuejs.org/)


컴포넌트간의 데이터 처리를 용이하게 하기 위해서 Container역할을 하는 상위 컴포넌트에서 데이터를 하나 만들고 props와 emit을 통해 하위 컴포넌트들이 데이터를 상위 컴포넌트와 주고 받고 데이터를 동기화해서 처리할 수 있게 하는 방식을 쓴다.

todoList에서도 마찬가지로 App이라는 상위 컴포넌트 내에 todoList의 큰 기능 단위로 나눈 하위 컴포넌트들을 상속받고

```jsx
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
```

하나의 data인 todoItems로 관리한다.

```jsx
data: function() {
    return {
      todoItems: [],
    }
  },
```

만약에 상위 컴포넌트 → 하위 컴포넌트로 데이터를 전달해줘야 하는 경우가 발생하면 props를 쓴다.

상위

```jsx
<todo-list v-bind:propsdata="todoItems">
```

todo-list 하위 컴포넌트에 propsdata라는 이름으로 todoItems를 넘긴다는 뜻이다.

하위

```jsx
export default {
    //원래 list 내에서 관리되던 todoItems를 root에서 선언하고 props로 내려보냈음.
    props: ['propsdata']
}
```

상위에서 보낸 todoItems를 propsdata로 받았다. 하위 컴포넌트에서는 이제 propsdata가 todoItems와 같게 된다.

```jsx
<li v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item" class="shadow">
```

그래서 이런 식으로 propsdata를 사용할 수 있다.

이제 하위 컴포넌트에서 상위 컴포넌트로 데이터를 전달해줘야 하는 경우는 emit을 쓴다. 

```jsx
<span class="checkContainer" v-on:click="toggleComplete(todoItem, index)" v-bind:class="{checkBtnCompleted: todoItem.completed}">
                    <i class="fas fa-check"></i>
                </span>
```

상위 컴포넌트로 데이터를 전달하는 이벤트를 v-on을 이용해 정의하고 이벤트가 발생하면 실행되는 함수명과 실행과 함께 전달되는 인자들을 선언한다. 

```jsx
methods: {
        removeTodo: function(todoItem, index) {
            this.$emit('removeTodoItem', todoItem, index);
        },
        toggleComplete: function(todoItem, index) {
            this.$emit('toggleComplete', todoItem, index);
        },
    }
```

하위 컴포넌트의 메소드 내에서 function안에 this.$emit을 이용해서 상위 컴포넌트로 메소드를 넘겨주는데 toggleComplete이라는 메소드를 상위 컴포넌트로 보내줌을 의미하며 todoItem과 index를 인자로 함께 넘겨준다.

```jsx
<todo-list v-bind:propsdata="todoItems" v-on:removeTodoItem="removeOneItem" v-on:toggleComplete="toggleComplete"></todo-list>
```

상위 컴포넌트에서는 메소드를 넘겨줬던 하위 컴포넌트의 html에서 해당 메소드의 호출을 받으면 상위 컴포넌트의 메소드 내에 선언된 toggleComplete를 실행하도록 v-on:toggleComplete=""toggleComplete 라고 작성하고 상위 컴포넌트의 메소드를 실행한다. 당연히 상위 메소드에서 상위 메소드를 실행한 것이기 때문에 통합 데이터에 접근 가능하다.

### Modal 사용하기

modal처럼 여러 컴포넌트에서 재사용하는 애들은 따로 컴포넌트로 생성해서 필요시 불러와서 사용하는게 좋음. modal을 불러와서 사용하면 

```jsx
<Modal v-if="showModal" @close="showModal = false">
      <!--
      you can use custom content here to overwrite
      default content
    -->
      <h3 slot="header">custom header</h3>
</Modal>
```

이렇게 불러와서 사용하는데 slot이라는 속성이 중요하다. slot이라는 속성은 특정 컴포넌트의 일부 ui들을 재사용할 수 있는 기능이다. 

```jsx
<div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
```

modal에서 html을 유심히 보면 이런식으로 header body footer로 구분되는데 안에 보면 slot이라는 속성으로 묶여져 있다. 이렇게 slot으로 묶여져 있는 속성은 이 컴포넌트를 부르는 상위 컴포넌트에서 재 정의할 수 있다. 내용을 변경할 수 있다.

```html
<h3 slot="header">warning!</h3>
<h5 slot="body">무언가를 입력하세요</h5>
<h5 slot="footer">copy right</h5>
```

이런 식으로 상위 컴포넌트에서 slot의 내용을 바꿔서 재정의할 수 있다. 재사용성 높아진다.

### ES6와 BABEL

ECMAScript 2015

최신 front-end framework인 react, angular, vue에서 권고하는 방식

es5에 비해 문법이 간결해져서 코딩을 편하게 할 수 있음.

상대적으로 간단한 es6 문법을 es5문법으로 바꿔주는게 babel이 하는 역할 traspiling!

```jsx
//es6
var sum = () => {return 10 + 20};

//es5
var sum = function() {
	return 10 + 20;
};

```

const & let

자바 스크립트가 가지고 있엇던 유연함은 그대로 이어가되 애매모호함을 최대한 보완.

- 블록 단위 {} 로 변수의 범위가 제한되었다.(es5에서의 var와 let&const의 차이점)
- const는 한번 선언한 값에 대해서 변경이 불가능한다. (상수 개념)

    근데 객체나 배열의 내부는 변경할 수 있다.

    ```jsx
    const a = {};
    a.num = 10;
    console.log(a);

    const b = []
    b.push(20);
    console.log(b)
    ```

- let은 한번 선언한 값에 대해서 다시 선언할 수 없다. (변경은 허용하는 것 선언만 안돼)

### 기존 es5의 특징

- 블록 {} 에 상관없이 스코프가 설정됨

    ```jsx
    var sum = 0;
    for (var i = 0; i <= 5; i++) {
    	sum = sum + i;
    }
    console.log(sum); //15
    console.log(i); //6  (만약 es6 let으로 선언했으면 여기서 오류났을 것)
    ```

    변수 선언 var에서의 자바와의 차이가 이런 것인데 자바라면 i라는 변수는 for {} scope안에서 선언된 변수이기 때문에 이 스코프 외에서 불리면 오류가 발생할 것 이다. 그런데 자바스크립트는 그렇지 않음.

- hoisting (변수 선언과 함수 선언이 먼저 일어나고 할당은 그 다음에 일어난다.)

    함수랑 변수가 가장 상단에 있는 것처럼 인식하는 것

    ```jsx
    function willBeOveridden() {
    	return 10;
    }

    //
    willBeOveridden();

    function() willBeOveridden{
    	return 5;
    }
    ```

    위의 코드 예시를 보면 당연히 10이 출력될 것 같지만 5가 출력된다.

    ```jsx
    var sum = 5;
    sum = sum + i;
    function sumAllNumbers() {
    }
    var i = 10;
    ```

    절차 지향의 입장에서 보면 sum = sum + i 할 때 i 가 정의되어 있지 않기 때문에 당연히 오류가 발생해야 하는 것처럼 보이지만 js에서는 변수 선언과 함수 선언등과 같은 statement들은 hoisting이 진행되기 때문에 메모리 공간에 제일 먼저 할당된다. var sum, var i가 sum = sum +i 보다 먼저 정의되기 때문에 오류도 안나고 값도 할당된다. 

### 새로운 es6의 특징

- const와 let은 {} 단위!

    ```jsx
    function f() {
    	{
    		let x;
    		{
    			const x = "sneaky"; //위의 x와는 다른 {}에 있어서 새로 선언해도 오류 안난다.
    			x = "fob"; // x를 const로 선언했으니까 변경하면 에러
    		}
    		x = "bar"; // x를 let으로 선언했으니까 값 변경해도 괜찮음
    		let x = "inner"; //x는 이미 선언되어 있으니까 에러
    	}
    }
    ```

- Arrow Function 화살표 함수

    함수를 정의할 때 function 이라는 키워드를 사용하지 않고 ⇒ 로 대체

    js 쓰면 쓸 수록 느끼는 거지만 function이라는 말이 많이 나옴 이거 간소화 하는 것만으로도 편의성이 높아짐.

    ```jsx
    var sum = function(a, b) {
    	return a + b;
    }

    var sum = (a, b) => {
    	return a + b;
    }
    ```

- 향상된 객체 리터럴 Enhanced Object Literals

    ```jsx
    var dictionary = {
    	words: 100,
    	//기존 es5
    	lookup: function() {
    		console.log("find words");
    	}
    	//새로운 es6
    	lookup() {
    		console.log("find words");
    	}
    }
    ```

- 객체의 속성명과 값 명이 동일할 때 아래와 같이 축약 가능

    ```jsx
    var figures = 10;
    var dictionary = {
    	//es5
    	figures: figures;
    	//es6
    	figures
    }
    ```

### 모듈 Modules

```jsx
//libs/math.js
export function sum(x, y) {
	return x + y;
}

export var pi = 3.141592;

import {sum} from 'libs/math.js';
sum(1, 2);
```

vue.js 에서 주로 사용하는게 export default 인데 default를 쓰면서 encapsulation을 한다. 

### Vuex - 상태 관리 라이브러리

- 복잡한 애플리케이션 컴포넌트들을 효율적으로 관리하는 vuex라이브러리 소개
- vuex 라이브러리의 등장 배경인 flux 패턴 소개
- vuex 라이브러리의 주요 속성인 state, getters, mutatuins, actions 학습
- vuex를 더 쉽게 코딩할 수 있는 방법인 Helper 기능 소개
- vuex로 프로젝트를 구조화 하는 방법과 모듈 구조화 방법 소개

**Vuex 란?**

무수히 많은 컴포넌트의 데이터를 관리하기 위한 상태 관리 패턴이자 라이브러리

React 의 Flux패턴에서 기인함

Vue.js 중고급 개발자로 성장하기 위한 필수 관문 (앱/웹 이 커지면 필수)

**Flux 란?**

MVC  패턴의 복잡한 데이터 흐름 문제를 해결하는 개발 패턴 (UniDirectional data flow  - 단 방향이라는게 핵심)
![13](https://user-images.githubusercontent.com/59568523/113684846-96291100-9700-11eb-9d1e-d39d1a52c8ad.PNG)


![10](https://user-images.githubusercontent.com/59568523/113684910-a93be100-9700-11eb-858a-98c5ba9b34f2.PNG)


![11](https://user-images.githubusercontent.com/59568523/113684973-bb1d8400-9700-11eb-9867-85a1df6555ac.PNG)


flux랑은 다르게 model과 view의 관계가 양방향임.

이러면

![12](https://user-images.githubusercontent.com/59568523/113685016-c7a1dc80-9700-11eb-9651-b9c5071d06b2.PNG)


데이터의 흐름을 추적하기가 매우 힘들다.

예를 들어 페이스북을 하는데 내가 채팅을 어떤 view에서 읽었음. 그럼 그게 model에 연관된 다른 view들에도 모두 적용이 되어야 하는데 해당 model이 어떤 뷰와 연관되어 있는지 양방향 연관관계를 형성하고 있어서 연관 관계를 추척해서 반영하기가 쉽지 않음. 그래서 양방향 연결 관계보다는 단방향 연결관계를 생성해서 하자는 flux패턴이 나오게 되었다.

![14](https://user-images.githubusercontent.com/59568523/113685070-d5576200-9700-11eb-94f5-6dc32749e288.PNG)


컴포넌트 개수 많아지면 props랑 emit이 엄청 번거로워 진다. 그리고 $emit $on 이러면 어디서 온 이벤트인지 알기가 어려움 컴포넌트가 데이터 전달이 명시적이지 않음.  → 이걸 vuex가 해결해준다.

![15](https://user-images.githubusercontent.com/59568523/113685132-e3a57e00-9700-11eb-96bb-cc2120966f49.PNG)


### vuex 구조

컴포넌트 → 비동기 로직 → 동기 로직 → 상태

### vuex 시작하기

src폴더 밑에 store 폴더 만들고 그 안에 store.js 파일 생성

```jsx
import Vue from 'vue'
import Vuex from 'vuex'

export const store = new Vuex.Store({
});
```

이렇게 작성하고 main.js 에서

```jsx
import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
```

**state, getters, mutatuins, actions**

- state

    여러 컴포넌트에 공유되는 데이터 (data)

- getters

    data값을 접근하려는 속성 (computed)

- mutations

    state값을 변경하려는 로직 (method)

- actions

    비동기 처리 로직을 선언하는 메소드 (async method)

mutation 의 commit 형식

```jsx
//App.vue
this.$store.commit('modifyState', {
	str: 'passed from payload',
	num: 10
});
```

이런 식으로 mutations에 인자를 state뿐만 아니라 다른 것들도 넘길 수 있는데 여러개면 객체로 감싸면 된다.

```jsx
state: {
        //headerText: "TODO it!"
        todoItems: storage.fetch()
    },
    mutations: {
        addItem(state, todoItem) {
            var obj = { completed: false, item: todoItem };
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index, 1);
        },
        toggleComplete(state, payload) {
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
            //localstorage는 update하는 api는 없기 때문에 지웠다가 다시 저장하는 방식 사용.
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
        },
        clearAll(state) {
            state.todoItems = [];
            localStorage.clear();
        }
    }
```

원래 App.vue todoList를 위한 하위 컴포넌트들의 상위 컴포넌트에 값을 props와 emit으로 주고 받으면서 관리했던 것들을 관리자를 모두 store.js로 옮김. 이러면 하위 컴포넌트들에서는 상위 컴포넌트로 emit을 하는게 아니라 store의 state를 commit하는 것으로 데이터 처리가 바뀐다.

노란색으로 구분한 부분을 보면 mutations의 모든 함수들은 첫 번째 인자로 무조건 state를 가지고 있어야 한다. state에 접근해서 그 안에 들은 데이터를 변경하는 것이기 때문에!! 그리고 나머지 하위 컴포넌트 들에서 가져온 데이터들은 하나면 그냥 todoItem이렇게 가져오고 만약 여러개면 payload처럼 객체로 감싸서 가져온다.

**그럼 왜 state를 바로 변경하지 않고 mutations로 변경할까?**

→ 어느 컴포넌트에서 state를 변경했는지 추적할 수 있게 하기 위해

### actions

비동기 처리 로직을 선언하는 메소드, 비동기 로직을 담당하는 mutations

비동기 로직을 이해하기 위한 비동기, promise 개념

[자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)

[자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)

```jsx
state: {
	num: 10
},
mutations: {
	doubleNumber(state) {
		state.num * 2;
	}
},
actions: {
	delayDoubleNumber(context) {
//첫 번째 인자가 state가 아니라 context다.
//이 context로 얘가 mutations에 접근 가능한 것이다.
//한 마디로 mutations에 신호를 보내는 역할을 한다.
		context.commit('doubleNumber');
	}
}
//app.vue
this.$store.dispatch('delayDoubleNumber');
```

```jsx
mutations: {
	addCounter(state) {
		state.counter++;
	}
}
actions: {
	delayAddCounter(context) {
		setTimeOut(() => context.commit('addCounter'), 2000);
	}
}

//App.vue
methods: {
	incrementCounter: {
		this.$store.dispatch('delayAddCounter');
	}
}
```

mutation을 실행하면 비동기적으로 state를 변화시키니까 동기화를 하기 위해 중간 매개체 역할로 actions를 둔다. mutations를 실행하는 commit이랑은 다르게 dispatch를 쓰고 인자로는 state가 아니라 context를 쓴다.

```jsx
mutations: {
	setDate(state, fetchedData) {
		state.product = fetchedData;
	}
}
//mutations는 state의 product변수에 fetchedData를 넣는 것이다.
//근데 비동기여서 만약에 fetchedData가 없으면 null값이 들어가게 될 것이다.
//이런거 해결하는게 promise이고 이를 위한 중간 다리가 actions이다.
actions: {
	fetchProductData(context) {
		return axios.get("http://domain.com/products/1")
								.then((response) => context.commit('setData', response));	
	}
}

//App.vue
methods: {
	getProduct() {
		this.$store.dispatch('fetchProductData');
	}
}
```

mutations 와 actions를 구분하는 이유는 동기와 비동기 로직들을 구분하기 위해서이다. 동기랑 비동기를 안 나눠서 처리하면 뭐가 언제 실행될지 알 수가 없기 때문에 그리고 state는 어떤 컴포넌트가 접근했는지 명확히 구분할 수 있어야 하는데 state를 변화 시키는데에 비동기가 섞여 버리면 그거 구분하기 더 힘들어지니까 state담당하는 mutations는 무조건 동기적 처리만 담당하고 actions가 나머지 비동기 처리를 담당하게 역할을 구분해 놓는 것이 좋다.

### Helper

![16](https://user-images.githubusercontent.com/59568523/113685202-f4ee8a80-9700-11eb-9263-b18e16b10255.PNG)


vuex에서 사용되는 state, getters, mutations, actions를 좀 더 쉽게 사용하고 코딩할 수 있도록 말그대로 도와주는 것

```jsx
import { mapState } from 'vuex'

computed() {
	num() {
		return this.$store.state.num;
	}
	//원래 위와 같이 써야 하는 코드를 mapState쓰면
	...mapState(['num']);
	//이렇게만 써도 되게 바뀐다.
}
//이렇게 하위 컴포넌트에서 num()을 선언해놓으면

<p>{{ this.$store.state.num }}</p>
//원래 위와 같이 써야 하는 코드를
<p>{{ this.num }}</p>
//이렇게 간단하게 쓸 수 있다는 장점이 있다.
```

최종 new Vuex.Store({}) 내부 코드

```jsx
export const store = new Vuex.Store({
    state: {
        //headerText: "TODO it!"
        todoItems: storage.fetch()
    },
    getters: {
        storedTodoItems(state) {
            return state.todoItems;
        }
    },
    mutations: {
        addItem(state, todoItem) {
            var obj = { completed: false, item: todoItem };
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeOneItem(state, { todoItem, index }) {
            localStorage.removeItem(todoItem.item);
            state.todoItems.splice(index, 1);
        },
        toggleComplete(state, { todoItem, index }) {
            state.todoItems[index].completed = !state.todoItems[index].completed;
            //localstorage는 update하는 api는 없기 때문에 지웠다가 다시 저장하는 방식 사용.
            localStorage.removeItem(todoItem.item);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
        },
        clearAll(state) {
            state.todoItems = [];
            localStorage.clear();
        }
    }
    //mutation의 속성은 첫 번째 인자로 state를 가진다. (vuex 규약)
});
```

마지막으로 store는 최대한 간결하게 todoApp이라는 파일 만들어서 module화 하면 끝!!!

```jsx
import Vue from 'vue'
import Vuex from 'vuex'
import todoApp from './modules/todoApp'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        todoApp
    }
});
```
