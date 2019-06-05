import Vue from 'vue';
import Router from 'vue-router';
import Main from '../pages/Main.vue';

Vue.use(Router);
let route = new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'Main'}
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      query: {lang: 'en'}
    }
  ]
});


export default route;
