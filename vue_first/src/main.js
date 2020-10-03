import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import http from './use_axios';
import { Toast } from 'vant';
Vue.use(Vant);

Vue.prototype.$axios=http;
Vue.prototype.$msg=Toast;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
