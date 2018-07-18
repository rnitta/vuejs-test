<template lang="pug">
.top
  .content
    .header
      span.header_logo 🚬
      h1.header_title Tobaco Friends
      .description
        p.description_text
          | タバコに行きたい人マッチングサービス。
          br
          | 未完成。
    .body
      entry-form
      create-room
      join-room
      waiting-modal
</template>

<script>
import Vue from 'vue'
import EntryForm from '@/components/EntryForm'
import CreateRoom from '@/components/CreateRoom'
import JoinRoom from '@/components/JoinRoom'
import WaitingModal from '@/components/WaitingModal'
Vue.component('entry-form', EntryForm)
Vue.component('create-room', CreateRoom)
Vue.component('join-room', JoinRoom)
Vue.component('waiting-modal', WaitingModal)

export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .top{
    width: 100%;
    height: 100%;
    background-color: #459893;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    width: 800px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .header {
      text-align: center;
      .header_logo {
        font-size: 100px;
      }
      .header_title {
        color: #ffffff;
        font-weight: bold;
        font-size: 40px;
      }
      .description {
        .description_text {
          font-size: 20px;
          text-align: center;
          color: #C7FFCF;
        }
      }
    }
    .body {
      .buttons {
        display: flex;
        flex-direction: column;
      }
      .overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #2c3e50;
        opacity: 0.8;
        z-index: 1;
      }
    }
  }
</style>
