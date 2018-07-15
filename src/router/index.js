import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/pages/Top'
import Room from '../pages/Room'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top
    }, {
      path: '/room',
      name: 'room',
      component: Room
    }
  ]
})
