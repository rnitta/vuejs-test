<template lang="pug">
  .room
    .wrapper
      .side
        .header
          p.title ルームの参加者🐒
        .body
          user-list
      .main
        .body
          event-list
        .footer
          input.description_input(type='text', placeholder='例) 12時にタバコいこ', v-model='eventDescription')
          <!-- @keyup.enter="createEventPushed()" -->
          button.create-event-button(@mouseover='pop = true', @mouseleave='pop = false', @click="createEventPushed()", @keyup.shift.13="createEventPushed()")
            | ＋
            .baloon(v-show='pop')
               span タバコフレンズを募集する
</template>

<script>
import Vue from 'vue'
import db from '@/config/firebase'
import UserList from '@/components/UserList'
import EventList from '@/components/EventList'
Vue.component('user-list', UserList)
Vue.component('event-list', EventList)
export default {
  data () {
    return {
      pop: false,
      eventDescription: '',
      test: []
    }
  },
  methods: {
    createEventPushed  () {
      let description = this.eventDescription
      this.eventDescription = null
      if (!description) { return false }
      db.collection('rooms').doc(this.$store.state.roomId).collection('events').add({
        description: description
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        alert('エラー')
        console.error(error)
      })
    }
  },
  created () {
    if (!this.$store.state.roomId || !this.$store.state.userId) {
      this.$router.push({ name: 'top' })
    }
    this.$bind('test', db.collection('rooms').doc(String(this.$store.state.roomId)).collection('users'))
  }
}
</script>

<style lang="scss" scoped>
.room{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #459893;
  .wrapper{
    box-sizing: border-box;
    padding: 10px;
    max-width: 600px;
    max-height: 400px;
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: row;
    border-radius: 10px;
    background-color: #efede1;
    .side{
      box-sizing: border-box;
      border-radius: 10px;
      padding: 5px;
      background-color: white;
      max-width: 200px;
      width: 33.33333%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .header{
        .title{
          text-align: center;
          font-weight: bold;
          font-size: 16px;
          padding-bottom: 5px;
          border-bottom: 1px solid #efede1;
        }
      }
    }
    .main{
      max-width: 450px;
      width: 100%;
      display: flex;
      flex-direction: column;
      .body{
        width: 100%;
        display: flex;
        flex: 1;
      }
      .footer{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .description_input {
          display: flex;
          flex: 1;
          margin: 4px 10px;
          height: 100%;
          font-size: 16px;
          padding: 10px;
          box-sizing: border-box;
          border: none;
        }
        button.create-event-button{
          display: block;
          height: 40px;
          width: 40px;
          border-radius: 50%;
          border: none;
          background-color: #e69936;
          line-height: 40px;
          color: white;
          text-align: center;
          font-size: 30px;
          &:active {
            background-color: #459893 !important;
          }
          &:hover {
            background-color: #ffa100;
          }
          .baloon{
            position: absolute;
            padding: 8px;
            min-width: 120px;
            max-width: 100%;
            color: white;
            font-size: 14px;
            background: #2c3e50;
            display: flex;
            align-items: center;
            margin: 15px;
          }
        }
      }
    }
  }
}
</style>
