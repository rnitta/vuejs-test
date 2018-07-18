<template lang="pug">
ul.event_list
  li.event_list_item(v-for='event in events')
    .event_item
      p.event_description {{ event.description }}
      p.event_creator {{ event.creatorName }}
      .event_controller(v-if='event.creatorId == $store.state.userId')
        button.deleteBtn(@click='deleteEvent(event)') 削除
      .event_participate(v-else)
        button.participateBtn(v-if='!event.participants[$store.state.userId]', @click='participate(event)') 参加
        button.unparticipateBtn(v-else, @click='unparticipate(event)') 参加表明済
      .event_participants
        span.names(v-for='participant in event.participants') {{ participant }}
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
    participate (event) {
      console.log(event)
      var tmphash = event.participants
      tmphash[this.$store.state.userId] = this.$store.state.userName
      db.collection('rooms').doc(this.$store.state.roomId).collection('events').doc(event.id).update({
        participants: tmphash
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        alert('エラー')
        console.error(error)
      })
    },
    unparticipate (event) {
      var tmphash = event.participants
      delete tmphash[this.$store.state.userId]
      db.collection('rooms').doc(this.$store.state.roomId).collection('events').doc(event.id).update({
        participants: tmphash
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        alert('エラー')
        console.error(error)
      })
    },
    deleteEvent (event) {
      db.collection('rooms').doc(this.$store.state.roomId).collection('events').doc(event.id).delete(
      ).then((res) => {
        console.log(res)
      }).catch((error) => {
        alert('エラー')
        console.error(error)
      })
    }
  },
  created () {
    this.$bind('events', db.collection('rooms').doc(String(this.$store.state.roomId)).collection('events').orderBy('createdAt', 'desc'))
  },
  updated () {

  }
}
</script>

<style lang="scss" scoped>
  .event_list {
    list-style: none;
    width: 100%;
    box-sizing: border-box;
    .event_list_item {
      width: 100%;
      box-sizing: border-box;
      border-radius: 10px;
      background-color: white;
      padding: 10px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    .event_item {
      .event_description {
        font-weight: 600;
        font-size: 16px;
        border-bottom: 1px solid #eceff1;
      }
      .event_creator {
        text-align: right;
        &::before {
          content: '募集者：'
        }
      }
      .event_controller, .event_participate {
        display: flex;
        justify-content: flex-end;
        button {
          border-radius: 4px;
          border: none;
          color: white;
          font-size: 14px;
          padding: 6px;
          &.deleteBtn {
            background-color: red;
          }
          &.participateBtn {
            background-color: #e69936;
          }
          &.unparticipateBtn {
            background-color: #888888;
          }
        }
      }
      .event_participants {
        &::before {
          content: '参加者：'
        }
        span.names {
          &:not(:last-child) {
            &::after {
              content: ', ';
            }
          }
        }
      }
    }
  }

</style>
