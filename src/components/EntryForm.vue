<template lang='pug'>
  .entry_form
    .buttons
      button.create_btn(v-on:click='createRoom') ルームを作成
      button.join_btn(v-on:click='joinRoom') ルームIDを入力

</template>

<script>
export default {
  methods: {
    createRoom () {
      this.$store.commit('switchBoolean', {property: 'createRoomFormFlag', flag: true})
    },
    joinRoom () {
      this.$store.commit('switchBoolean', {property: 'joinRoomFormFlag', flag: true})
    }
  }
}

</script>

<style lang='scss' scoped>
.entry_form {
  border: 1px solid #ffffff;
  border-radius: 10px;
  padding: 30px;
  .inputs {
    display: flex;
    flex-direction: row;
    align-items: center;
    input{
      border: none;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 15px;
      margin: 10px;
      width: 200px;
      font-size: 20px;
    }
    .entry_slash {
      color: #ffffff;
    }
  }
  .buttons {
    display: flex;
    flex-direction: column;
    padding: 10px;
    button {
      padding: 10px;
      border: none;
      border-radius: 10px;
      font-size: 20px;
      color: #ffffff;
      font-weight: bold;
      width: 400px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    .create_btn {
      background: #e69936;
    }
    .join_btn {
      background:#c6bb9f;
    }

  }
}
</style>
