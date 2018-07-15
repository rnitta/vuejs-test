<template lang="pug">
  .modal(v-show="this.$store.state.joinRoomFormFlag", @click='hideModal')
    .join_room(v-on:click.stop="")
      .header
        h2.header_title
          | 🐬ルームに参加する
      .description
        p.description_text
          | 参加するルームのIDとあなたのニックネームを入力してください
          br
          | （※ニックネームはルームの参加者以外に公開されません）
      .form
        .field
          label.room_id_label(for='room_id_input') ルームID
          input#room_id_input(type='text', maxlength='20', placeholder='必須', v-model='roomId', v-bind:class='{ improper_input : roomId == "" }')
        .field
          label.your_name_label(for='your_name_input') ニックネーム
          input#your_name_input(type='text', maxlength='20', placeholder='必須', v-model='yourName', v-bind:class='{ improper_input : yourName == "" }')
        .btn_field
          span.inputs_insufficient_notice(v-show='inputsInsufficient') 必須フィールドを入力してください
          button.next_btn(@click='goNext') 次へ👉
</template>

<script>
import db from '@/config/firebase'

export default {
  data () {
    return {
      roomId: null,
      yourName: null,
      inputsInsufficient: false
    }
  },
  methods: {
    hideModal () {
      this.$store.commit('switchBoolean', {property: 'joinRoomFormFlag', flag: false})
    },
    goNext () {
      this.inputsInsufficient = false
      if (!this.roomId || !this.yourName) {
        this.inputsInsufficient = true
        return false
      }
      this.$store.commit('switchBoolean', {property: 'waiting', flag: true})
      db.collection('rooms').doc(this.roomId)
        .get()
        .then((res) => {
          console.log(res)
          if (res.exists) {
            this.createUser()
          } else {
            alert(`入力されたID: ${this.roomId} は存在しません`)
            this.roomId = ''
          }
        })
        .catch((error) => {
          alert('エラー')
          console.log(error)
        }).finally(() => {
          this.$store.commit('switchBoolean', { property: 'waiting', flag: false })
        })
    },
    createUser () {
      db.collection('rooms').doc(this.roomId).collection('users').add({
        name: this.yourName
      }).then((res) => {
        this.$store.commit('setString', { property: 'roomId', str: res.parent.parent.id })
        this.$store.commit('setString', { property: 'userId', str: res.id })
        this.$router.push({ name: 'room' })
      }).catch((error) => {
        console.error(error)
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
    .join_room {
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
            &.room_id_label{
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
