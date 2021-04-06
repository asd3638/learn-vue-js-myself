import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storage = {
    fetch() {
        const arr = [];
        if (localStorage > 0) {
            for (let i = 0; i < localStorage.length(); i++) {
                if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
                    arr.push(
                        JSON.parse(localStorage.getItem(localStorage.key(i)))
                    );
                }
            }
        }
        return arr;
    }
};
//export 하면 이 변수를 밖에서 사용할 수 있다.
export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()
    },
    //mutation의 속성은 첫 번째 인자로 state를 가진다. (vuex 규약)
    mutations: {

    }
});