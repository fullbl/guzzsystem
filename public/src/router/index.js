import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Callback from '@/components/Callback';
import Form from '@/components/Form';
import List from '@/components/List';
import Special from '@/components/Special';
import { requireAuth } from '../utils/auth';

const BASE_API_URL = process.env.BASE_API_URL;

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/bar',
      name: 'Bar',
      beforeEnter: requireAuth,
      props: {
        inputs: require('../assets/forms/bar.json'),
        title: 'Bar',
        action: BASE_API_URL + 'bar'
      },
      component: Form
    },
    {
      path: '/ingresso',
      name: 'Ingresso',
      beforeEnter: requireAuth,
      props: {
        inputs: require('../assets/forms/ingresso.json'),
        title: 'Ingresso',
        action: BASE_API_URL + 'ingresso'
      },
      component: Form
    },
    {
      path: '/lista',
      name: 'Lista',
      beforeEnter: requireAuth,
      props: {        
        listUrl: BASE_API_URL + 'list'
      },
      component: List
    },
    {
      path: '/horses',
      name: 'Special',
      beforeEnter: requireAuth,
      props: {        
        listUrl: BASE_API_URL + 'special'
      },
      component: Special
    }
  ]
})
