<template>
  <step-layout class="template-mode"
               title="Template Approach"
               :readme="readme">
    <!-- Links -->
    <template #links>
      <router-link to="canvas">
        Canvas
      </router-link>
      <router-link to="webgl">
        WebGL
      </router-link>
    </template>

    <!-- Graph -->
    <template-graph />
  </step-layout>
</template>

<script>
import readme from '@/assets/markdown/step1.md'
import TemplateGraphVue from '../components/graphs/TemplateGraph.vue'
export default {
  components: {
    TemplateGraph: TemplateGraphVue
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
