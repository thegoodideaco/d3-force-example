<template>
  <div class="filled">
    <mark-down :value="mark" />

    <force-test />
  </div>
</template>

<script>
import MarkdownViewerVue from './MarkdownViewer.vue'
import mark from '@/assets/markdown/test.md'
import ForceTestVue from './ForceTest.vue'

export default {
  components: {
    MarkDown:  MarkdownViewerVue,
    ForceTest: ForceTestVue
  },
  data() {
    return {
      mark
    }
  }
}
</script>

<style scoped lang="scss">
.test {
  display: grid;
  grid: 100% / auto 1fr;
}

.filled {
  display: grid;
  grid: 100% / max-content 1fr;
  height: 100%;
}
</style>
