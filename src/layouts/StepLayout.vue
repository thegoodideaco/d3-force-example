<template>
  <!-- Step Layout Wrapper -->
  <div class="step-layout">
    <aside class="info">
      <info-title :title="title" />

      <markdown :value="readme" />
    </aside>

    <div class="content-container">
      <slot>
        Content goes here
      </slot>
    </div>
  </div>
</template>

<script>

import StepInfoTitleVue from '../components/StepInfoTitle.vue'
import Markdown from '../components/MarkdownViewer.vue'

/**
 * This provides a simple setup for laying out a step
 * Each step has a readme, and content to go with it.
 */
export default {
  components: {
    InfoTitle: StepInfoTitleVue,
    Markdown
  },
  props: {
    readme: {
      type:     [String, Function],
      required: true
    },
    title: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
.step-layout {
  display: grid;
  grid: 100% / minmax(30%, 300px) 1fr;
}

.info {
  background-color: #000;
  min-width: 400px;
  display: grid;
  grid: auto 1fr / 100%;
}

.content-container {
  display: grid;
  grid: 100% / 100%;
  place-items: center;
}
</style>
