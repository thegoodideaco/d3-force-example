<template>
  <div class="info-caption">
    <!-- Main Logo -->
    <img :src="require('@/assets/main-logo.svg')">

    <!-- Text -->
    <h4>{{ title }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type:    String,
      default: 'Place Title Here'
    }
  }
}
</script>

<style scoped lang="scss">
.info-caption {
  display: grid;
  font-size: 28px;
  grid: 28px / 58px 1fr;
  align-items: center;
  padding: 15px;

  column-gap: 10px;
  text-transform: uppercase;

  > * {
    margin: 0;
    font-size: 30px;
    line-height: 28px;
  }

  img {
    height: 100%;
    width: auto;
  }
}
</style>
