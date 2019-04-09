<template>
  <div class="template-component">
    <canvas v-once
            ref="canvas">
            <!-- D3 Handles this -->
    </canvas>
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
      simulation: null,

      /** @type {CanvasRenderingContext2D} */
      canvas: null
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
    const { nodes, links } = await json('/miserables.json')

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

    // this.canvas = this.$refs.canvas.getContext('2d')
    this.canvas = this.$el.querySelector('canvas').getContext('2d')
    this.canvas.canvas.width = width
    this.canvas.canvas.height = height

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

    // When the simulation ticks, we can have d3 render on the canvas
    this.drawCanvas()
    this.simulation.on('tick', this.drawCanvas)
  },

  // Stop the simulation when destroyed
  beforeDestroy() {
    if (this.simulation) {
      this.simulation.stop()
    }
  },

  methods: {
    drawCanvas() {
      const {
        canvas: {
          width,
          height
        }
      } = this.canvas
      this.canvas.clearRect(0, 0, width, height)

      // Draw links

      this.links.forEach(v => {
        this.canvas.strokeStyle = this.groupColors(v.source.group)
        this.canvas.beginPath()
        this.canvas.moveTo(v.source.x, v.source.y)
        this.canvas.lineTo(v.target.x, v.target.y)
        this.canvas.stroke()
      })


      // Draw nodes
      this.nodes.forEach(v => {
        this.canvas.fillStyle = this.groupColors(v.group)
        this.canvas.beginPath()
        this.canvas.moveTo(v.x, v.y)
        this.canvas.arc(v.x, v.y, 5, 0, 2 * Math.PI)
        this.canvas.fill()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.template-component {
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
