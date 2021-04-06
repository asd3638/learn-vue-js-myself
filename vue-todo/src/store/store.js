import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    }
}
//export 하면 이 변수를 밖에서 사용할 수 있다.
export const store = new Vuex.Store({
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
    //mutation의 속성은 첫 번째 인자로 state를 가진다. (vuex 규약)
});