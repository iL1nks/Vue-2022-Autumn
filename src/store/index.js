import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import createPersistedState from 'vuex-persistedstate'
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
    set_login(state, login) {
      state.login_state = login;
    },
    set_userid(state, userid) {
      state.userid = userid;
    },
    set_username(state, username) {
      state.username = username;
    },
    set_user_photo(state, user_photo) {
      state.user_photo = user_photo;
    },
    set_user_email(state, user_email) {
      state.user_email = user_email;
    },
    set_user_truename(state, user_truename) {
      state.user_truename = user_truename;
    },
    set_token(state, token) {
      state.token = token;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
