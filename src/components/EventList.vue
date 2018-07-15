<template lang="pug">
ul.event-list
  li.event_list_item(v-for='event in events')
    .event_item
      p {{ event.description }}
</template>

<script>
import db from '@/config/firebase'
export default {
  data () {
    return {
      events: []
    }
  },
  methods: {
  },
  created () {
    this.$bind('events', db.collection('rooms').doc(String(this.$store.state.roomId)).collection('events'))
  }
}
</script>

<style lang="scss" scoped>

</style>
