import Vue from 'vue'
import Router from 'vue-router'
import top from '@/pages/Top'
import Create from '../pages/Create'
import Join from '../pages/Join'
import Room from '../pages/Room'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'top',
      component: top
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/join',
      name: 'join',
      component: Join
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    }
  ]
})
