<template lang="pug">
   .overlay(v-show='this.$store.state.modal', @click='hideModal')
</template>

<script>
export default {
  methods: {
    hideModal () {
      this.$store.commit('switchModal', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
