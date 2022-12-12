import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 0:游客 1:登录用户
    login_state: 1,
    userid: undefined,
    username: 'test1',
    user_photo: '',
    user_email: '',
    user_truename: '',
    token: '',
  },
  getters: {
  },
  mutations: {
    set_userid(state, userid) {
      state.userid = userid;
    },
    set_token(state, token) {
      state.token = token;
    },
  },
  actions: {
  },
  modules: {
  }
})
