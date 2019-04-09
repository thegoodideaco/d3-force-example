<template>
  <step-layout class="webgl-mode"
               title="WebGL Approach"
               :readme="readme">
    <!-- Links -->
    <template #links>
      <router-link to="canvas">
        Canvas
      </router-link>
      <router-link to="template">
        Template
      </router-link>
    </template>

    <!-- Graph -->
    <canvas-graph />
  </step-layout>
</template>

<script>
import readme from '@/assets/markdown/webgl.md'
import CanvasGraphVue from '../components/graphs/WebglGraph.vue'
export default {
  components: {
    CanvasGraph: CanvasGraphVue
  },
  data() {
    return {
      readme
    }
  }
}
</script>

<style>
</style>
