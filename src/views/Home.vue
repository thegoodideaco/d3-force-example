<template>
  <!-- Simple Splash page -->
  <div class="home">
    <background v-if="loaded"
                class="abs" />

    <div class="rotator"
         :style="rotateStyle">
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
import { scaleLinear } from 'd3'

export default {
  name:       'Home',
  components: {
    Background: ForceTestVue
  },
  data() {
    return {
      rotateScales: {
        x: null,
        y: null
      },
      rotateStyle: null,
      loaded:      false
    }
  },
  mounted() {
    const {
      innerWidth: width,
      innerHeight: height
    } = window

    this.$nextTick(() => this.loaded = true)

    const maxAngle = 10

    this.rotateScales = {
      x: scaleLinear()
        .domain([0, height])
        .range([maxAngle, -maxAngle]),
      y: scaleLinear()
        .domain([0, width])
        .range([-maxAngle, maxAngle])
    }

    const event = this.isTouch() ? 'touchmove' : 'mousemove'

    document.addEventListener(event, this.updateRotation)


    this.$on('hook:beforeDestroy', () => {
      document.removeEventListener(event, this.updateRotation)
    })
  },
  methods: {

    /** @param {MouseEvent & TouchEvent} e */
    updateRotation(e) {
      let {
        pageX: x,
        pageY: y
      } = e

      if(e.touches && e.touches[0]) {
        x = e.touches[0].pageX
        y = e.touches[0].pageY
      }

      const rotations = {
        x: this.rotateScales.x(y),
        y: this.rotateScales.y(x)
      }

      const perspective = 'perspective(500px)'
      const xdeg = `rotateX(${rotations.x}deg)`
      const ydeg = `rotateY(${rotations.y}deg)`

      this.rotateStyle = {
        transform: `${perspective} translateZ(-65px) ${xdeg} ${ydeg}`
      }
    },

    isTouch() {
      return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0))
    }

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
  color: rgba(#fff, 0.5);
  text-decoration: none;
  font-size: 1.1rem;

  &:hover,
  &:active {
    color: #00f185;
  }
}

.rotator {
  backface-visibility: hidden;
  transform-style: flat;
  transform-origin: center center -55px;

  .links {
    margin-top: 20px;
    display: grid;
    grid-auto-flow: column;
    column-gap: 10px;
    text-transform: uppercase;
    text-rendering: optimizeSpeed;
  }
}
</style>

