import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Create from '../components/create'
import Join from '../components/join'
import Room from '../components/room'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
