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
</style>
