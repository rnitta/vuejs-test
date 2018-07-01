// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './config/store'
import VueFire from 'vuefire'
import firebase from 'firebase'
import {firebaseConfig} from './config/firebase-config'
import('./css/main.scss')

Vue.use(VueFire)

const fb = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
console.log(fb.name)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
