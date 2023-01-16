import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';
import Home from '../views/Home.vue';
import Meta from '../views/Meta.vue';
import MintNfa from '../views/MintNfa.vue';
import Nfa from '../views/Nfa.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue'

Vue.use(Router);
Vue.use(VueMeta);

export const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/meta',
      name: 'meta',
      component: Meta
    },
    {
      path: '/mint',
      name: 'mintnfa',
      component: MintNfa,
      meta: { requiresAuth: true }
    },
    {
      path: '/nfa',
      name: 'nfa',
      component: Nfa
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});


export default router
