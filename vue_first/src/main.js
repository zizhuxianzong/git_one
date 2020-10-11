import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import api from './api/index';
import { Toast } from 'vant';
import '@/assets/style.css'
Vue.use(Vant);

Vue.prototype.$axios=api;
Vue.prototype.$msg=Toast;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
