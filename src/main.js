// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import Lodash from 'lodash-for-vue';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import trans from './service/Trans'


// require styles
import 'swiper/dist/css/swiper.css'

import './styles/_app.scss';
Vue.prototype.$trans = trans
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Lodash);
Vue.use(VueAwesomeSwiper, /* { default global options } */)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

// {
//   "tokenAddress":"0xbabbc7445d2e68451b0a89016cd7ef53b94f5031",
//   "artAddress":"0x12707e5222ad9b8ad9ea88da675544c604ada6c0"
// }