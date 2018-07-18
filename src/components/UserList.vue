<template lang="pug">
  ul.user_list
    li.user_list_item(v-for='user in users')
      p.user_name {{ user.name }}
</template>

<script>
import db from '@/config/firebase'
export default {
  data () {
    return {
      users: []
    }
  },
  methods: {
  },
  created () {
    this.$bind('users', db.collection('rooms').doc(String(this.$store.state.roomId)).collection('users'))
  }
}
</script>

<style lang="scss" scoped>
.user_list {
  list-style: none;
  margin-top: 10px;
  &_item {
    .user_name {
      text-overflow: ellipsis;
      text-align: right;
      padding: 5px;
      &:hover {
        background-color: #ECEFF1;
      }
    }
  }
}
</style>
