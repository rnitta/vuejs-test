<template lang="pug">
.modal(v-show="this.$store.state.createRoomFormFlag", @click='hideModal')
  .create_room(v-on:click.stop="")
    .header
      h2.header_title
        | 🏠ルームを作成する
    .description
      p.description_text
        | 作成するルーム名とあなたのニックネームを入力してください
        br
        | （※ルームの参加者以外に公開されません）
    .form
      .field
        label.room_name_label(for='room_name_input') ルーム名
        input#room_name_input(type='text', maxlength='20', placeholder='必須', v-model='roomName', v-bind:class='{ improper_input : roomName == "" }', @keyup.shift.13="goNext()")
      .field
        label.your_name_label(for='your_name_input') ニックネーム
        input#your_name_input(type='text', maxlength='20', placeholder='必須', v-model='yourName', v-bind:class='{ improper_input : yourName == "" }', @keyup.shift.13="goNext()")
      .btn_field
        span.inputs_insufficient_notice(v-show='inputsInsufficient') 必須フィールドを入力してください
        button.next_btn(@click='goNext') 次へ👉
</template>

<script>
import db from '@/config/firebase'

export default {
  data () {
    return {
      roomName: null,
      yourName: null,
      inputsInsufficient: false
    }
  },
  methods: {
    hideModal () {
      this.$store.commit('switchBoolean', {property: 'createRoomFormFlag', flag: false})
    },
    goNext () {
      this.inputsInsufficient = false
      if (!this.roomName || !this.yourName) {
        this.inputsInsufficient = true
        return false
      }
      this.$store.commit('switchBoolean', {property: 'createRoomFormFlag', flag: true})
      this.$store.commit('switchBoolean', {property: 'waiting', flag: true})
      db.collection('rooms').where('name', '==', this.roomName)
        .get()
        .then((res) => {
          if (res.empty) {
            this.createRoom(this.roomName, this.yourName)
          } else {
            alert(`${this.roomName}: 同名のルームが既に存在します`)
            this.roomName = ''
            this.$store.commit('switchBoolean', { property: 'waiting', flag: false })
          }
        })
        .catch((error) => {
          alert('エラー')
          console.log(error)
          this.$store.commit('switchBoolean', { property: 'waiting', flag: false })
        }).finally(() => {
        })
    },
    createRoom (roomName, yourName) {
      db.collection('rooms').add({
        name: roomName,
        description: ''
      }).then((res) => {
        this.$store.commit('setString', { property: 'roomId', str: res.id })
        this.createUser()
      }).catch((error) => {
        console.error(error)
        this.$store.commit('switchBoolean', { property: 'waiting', flag: false })
      })
    },
    createUser () {
      db.collection('rooms').doc(this.$store.state.roomId).collection('users').add({
        name: this.yourName
      }).then((res) => {
        this.$store.commit('setString', { property: 'userId', str: res.id })
        this.$store.commit('setString', { property: 'userName', str: this.yourName })
        this.$router.push({ name: 'room' })
      }).catch((error) => {
        console.error(error)
        this.$store.commit('switchBoolean', { property: 'waiting', flag: false })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(44, 62, 80, 0.8);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .create_room {
    width: 500px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 50px;
    z-index: 2;
    .header {
      .header_title{
        text-align: center;
        font-size: 30px;
      }
    }
    .description {
      .description_text {
        font-size: 14px;
        text-align: center;
      }
      margin-bottom: 40px;
    }
    .form{
      display: flex;
      flex-direction: column;
      .field{
        display: flex;
        flex-direction: row;
        align-items: center;
        &:not(:last-child) {
          margin-bottom: 20px;
        }
        label{
          font-size: 20px;
          margin-right: 20px;
          &:after{
            content: '：'
          }
          &.room_name_label{
            padding-right: 40px;
          }
        }
        input{
          font-size: 20px;
          padding: 10px;
          flex: 1;
          border-radius: 10px;
          border: 1px solid #2c3e50;
          &:focus {
            border-color: #459893;
          }
          &.improper_input{
            border: 1px solid red;
          }
        }
      }
      .btn_field {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        span.inputs_insufficient_notice {
          color: red;
          font-size: 12px;
          margin-right: 20px;
        }
        .next_btn{
          padding: 10px;
          background-color: #ffffff;
          border-radius: 20px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
