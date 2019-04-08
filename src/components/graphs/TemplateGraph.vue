<template>
  <div class="template-component">
    <svg width="100%"
         height="100%">
      <!-- Links -->
      <g class="links">
        <line
          v-for="link in links"
          :key="link.index"
          :stroke="groupColors(link.source.group)"
          stroke-width="2"
          stroke-opacity="0.25"
          :x1="link.source.x"
          :y1="link.source.y"
          :x2="link.target.x"
          :y2="link.target.y" />
      </g>

      <!-- Nodes -->
      <g class="nodes">
        <circle
          v-for="node in nodes"
          :key="node.name"
          :r="7"
          :fill="groupColors(node.group)"
          stroke="#fff"
          stroke-width="1"
          :cx="node.x"
          :cy="node.y">
          <title>{{ node.name }}, {{ node.group }}</title>
        </circle>
      </g>
    </svg>
  </div>
</template>

<script>
import {
  json,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  scaleQuantize,
  schemeCategory10
} from 'd3'
export default {
  data() {
    return {

      /** @type {d3.SimulationNodeDatum} */
      nodes: null,

      /** @type {d3.SimulationLinkDatum} */
      links: null,

      /** @type {d3.Simulation} */
      simulation: null
    }
  },
  computed: {

    /**
     * Returns a color when called with a group
     */
    groupColors() {
      const totalGroups = this.nodes.reduce((prev, cur) => {
        return Math.max(prev, cur.group)
      }, 0)

      return scaleQuantize()
        .domain([0, totalGroups])
        .range([...schemeCategory10, 'pink'])
    }
  },

  // construct the d3 logic when mounted
  async mounted() {
    const { width, height } = this.$el.getBoundingClientRect()

    // Load the data
    const {
      nodes,
      links
    } = await json('/miserables.json')

    // update our nodes and links
    this.links = links
    this.nodes = nodes.map((v, index) => ({
      ...v,

      // We assign these other values so that they can be observed by Vue
      index,
      x:  0,
      y:  0,
      vx: 0,
      vy: 0
    }))

    // Create a force simulation to apply positioning values to nodes
    this.simulation = forceSimulation(this.nodes)
      .force('link', forceLink(this.links).id((v, i) => i))
      .force(
        'charge',
        forceManyBody()
          .strength(-70)
          .distanceMax(1000)
      )
      .force('center', forceCenter(width / 2, height / 2))
      .alphaTarget(0)
      .alphaDecay(0.008)

    // Add some time for the nodes to settle
    this.simulation.tick(10)
  },

  // Stop the simulation when destroyed
  beforeDestroy() {
    if (this.simulation) {
      this.simulation.stop()
    }
  }
}
</script>

<style scoped lang="scss">
.template-component {
  width: 100%;
  height: 100%;
}
</style>
