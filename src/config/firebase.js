import firebase from 'firebase'
import VueFire from 'vuefire'
import {firebaseConfig} from '@/config/firebase-config'
import Vue from 'vue'
Vue.use(VueFire)
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
db.settings({timestampsInSnapshots: true})

export default db
