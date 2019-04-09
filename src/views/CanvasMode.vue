<template>
  <step-layout class="canvas-mode"
               title="Canvas Approach"
               :readme="readme">
    <!-- Links -->
    <template #links>
      <router-link to="template">
        Template
      </router-link>
      <router-link to="webgl">
        WebGL
      </router-link>
    </template>

    <!-- Graph -->
    <canvas-graph />
  </step-layout>
</template>

<script>
import readme from '@/assets/markdown/canvas.md'
import CanvasGraphVue from '../components/graphs/CanvasGraph.vue'
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
