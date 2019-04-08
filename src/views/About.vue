<template>
  <div class="about">
    <h1>This is an about page</h1>

    <force-display class="filled" />
  </div>
</template>

<script>
import ForceTestVue from '../components/ForceTest.vue'
export default {
  components: {
    ForceDisplay: ForceTestVue
  }
}
</script>

<style lang="scss" scoped>
.filled {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
