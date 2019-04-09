<template>
  <!-- Step Layout Wrapper -->
  <div class="step-layout">
    <!-- Info -->
    <aside class="info">
      <div class="info__inner">
        <!-- Title -->
        <info-title :title="title">
          <!-- Title links are inserted here -->
          <slot name="links" />
        </info-title>

        <markdown :value="readme" />
      </div>
    </aside>

    <!-- Content -->
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

  @media screen and (max-width: 1100px) {
    grid: 90vh max-content / 100%;
    height: 100vh;
    overflow: auto;
  }
}

.info {
  @media screen and (max-width: 1100px) {
    position: relative;
    z-index: 1;
    padding-top: 90vh;
    padding-left: 25px;
    padding-right: 25px;

    order: 1;
  }

  &__inner {
    min-width: 400px;
    display: grid;
    grid: auto 1fr / 100%;
    background-color: #18242b;
    height: 100%;

    @media screen and (max-width: 1100px) {
      top: 90vh;
      height: fit-content;
      min-width: unset;
      max-width: 600px;
      margin: auto;
      margin-bottom: 25px;
      border: 2px solid rgba(#fff, 0.5);
    }
  }
}

.content-container {
  display: grid;
  grid: 100% / 100%;
  place-items: center;

  @media screen and (max-width: 1100px) {
    position: fixed;
    width: 100%;
    height: 100vh;
    pointer-events: none;
  }
}
</style>
