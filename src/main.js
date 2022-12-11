import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import commonApi from "./utils/commonApi";
import userApi from "./utils/userApi";

Vue.use(ElementUI);
Vue.use(commonApi);
Vue.use(userApi);

Vue.config.productionTip = false


Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://stcmp.shlprn.cn/api/';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
