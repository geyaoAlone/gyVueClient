import Vue from 'vue';
import Vuex from 'vuex';
import util from  '@/util';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        session:null,
        openID:null
    },
    mutations: {
        setSession(state,user){
            localStorage.setItem('user',JSON.stringify(user));
            state.session = user;
        },
        setOpenID(state,openID){
            sessionStorage.openID  = openID;
            state.openID  = openID;
        },
        clearSession(state) {
            localStorage.removeItem( 'user');
            state.session = null;
        }

    },
    actions: {

    },
    modules: {
    }
});

(function(){
    if(localStorage.user) {
        store.commit('setSession', JSON.parse(localStorage.getItem('user')));
    }
    /*
    let openID =  sessionStorage.openID || util.getRequest('weChatOpenId') || util.getRequest('aliPayOpenId');
    alert(openID)
    if(openID) {
        store.commit('setOpenID', openID);
    }
    */
})();

export default store;
