<template>
  <div class="info-caption">
    <!-- Title -->
    <div class="logo-title">
      <!-- Main Logo -->
      <img :src="require('@/assets/main-logo.svg')"
           @click="goHome">

      <!-- Text -->
      <h4>{{ title }}</h4>
    </div>

    <!-- Links, etc.. -->
    <div v-if="$slots.default"
         class="link-container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type:    String,
      default: 'Place Title Here'
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.info-caption {
  display: grid;
  font-size: 28px;
  grid: 28px auto / 100%;
  // grid:
  //   [row1-start] 'icons text' 28px [row1-end]
  //   [row2-start] 'links links' auto [row2-end]
  //   / max-content 1fr;

  align-items: center;
  padding: 15px;

  column-gap: 10px;
  text-transform: uppercase;

  > div {
    margin: 0;
    font-size: 22px;
    line-height: normal;

    // &:nth-child(1) {
    //   grid-area: icons;
    // }
    // &:nth-child(2) {
    //   grid-area: text;
    // }
    // &:nth-child(3) {
    //   grid-area: links;
    // }
  }

  img {
    height: 100%;
    width: auto;
  }
}

.logo-title {
  display: grid;
  grid: 100% / max-content 1fr;
  height: 100%;
  column-gap: 10px;
  align-items: center;

  > * {
    margin: 0;
  }
}

.link-container {
  display: grid;
  grid-auto-flow: column;
  column-gap: 20px;
  align-items: center;
  justify-items: center;
  padding: 20px;
  font-size: 14px;

  a {
    font-size: 1rem;
    color: #fff;
    text-decoration: none;
  }
}
</style>
