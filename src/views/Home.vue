<template>
  <!-- Simple Splash page -->
  <div class="home">
    <background class="abs" />

    <div>
      <img src="@/assets/main-logo.svg">
      <h2>Rendering D3 in Vue.js</h2>

      <div class="links">
        <router-link to="/template">
          Template
        </router-link>
        <router-link to="/canvas">
          Canvas
        </router-link>
        <router-link to="/webgl">
          WebGL
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ForceTestVue from '../components/ForceTest.vue'

export default {
  name:       'Home',
  components: {
    Background: ForceTestVue
  }
}
</script>

<style lang="scss" scoped>
.abs {
  position: absolute;
  top: 0;
  left: 0;
  // z-index: -1;

  + div {
    position: relative;
    user-select: none;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
}

img {
  max-width: fit-content;
  height: auto;
  margin: 20px;
  display: inline-block;
}

h2 {
  margin: 0;
  text-transform: uppercase;
}

a {
  pointer-events: auto;
  color: #fff;
  text-decoration: none;
  font-size: 1.3rem;

  &:hover {
    color: blue;
  }
}
</style>

