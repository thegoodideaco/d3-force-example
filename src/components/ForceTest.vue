<template>
  <div
    v-once
    class="fill"
    @contextmenu.prevent
    @mousewheel="test"
    @mousedown="dragged"
    @mouseup="dragended">
    <canvas ref="canvas" />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import * as pixi from 'pixi.js'
import { range } from 'd3-array'
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceX,
  forceY,
  forceCenter,
  forceRadial
} from 'd3-force'
import { event } from 'd3-selection'
import {
  scaleSequential,
  interpolateSinebow,
  rgb,
  interpolateSpectral
} from 'd3'
export default {
  data() {
    return {
      dragging:   false,
      width:      null,
      height:     null,
      zoom:       40,
      colorScale: null
    }
  },
  computed: {
    /**
     * @type {Vue.ComputedOptions<d3.Simulation<ForceTestNode,ForceTestLink>}
     */
    simulation: {
      get() {
        return this.$options.simulation
      },
      set(v) {
        this.$options.simulation = v
      }
    },

    /**
     * @type {Vue.ComputedOptions<PIXI.Application>}
     */
    pixiRender: {
      get() {
        return this.$options.pixi
      },
      set(v) {
        this.$options.pixi = v
      }
    }
  },
  beforeDestroy() {
    this.simulation.stop()
    this.simulation = null

    this.pixiRender.destroy(true)

    this.$delete(window, 'app')

    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('mousemove', this.updateMouse)
  },
  mounted() {
    const { width, height } = this.$el.getBoundingClientRect()

    pixi.utils.skipHello()

    this.pixiRender = new pixi.Application({
      view:      this.$refs.canvas,
      // powerPreference: 'high-performance',
      forceFXAA: true,
      width,
      height
    })

    this.pixiRender.renderer.backgroundColor = parseInt('2b414f', 16)
    this.pixiRender.renderer.options.antialias = false

    /** @type {PIXI.Sprite} */
    const bg = new pixi.Sprite.fromImage('/bg.png')

    bg.width = width
    bg.height = height
    this.pixiRender.stage.addChild(bg)

    window.app = this.pixiRender

    Object.assign(this.$data, {
      width,
      height
    })

    const container = new pixi.particles.ParticleContainer(10000)

    this.pixiRender.stage.addChild(container)

    this.colorScale = scaleSequential(interpolateSpectral).domain([0, 1000])

    this.nodes = range(1000).map((k, i) => {
      /** @type {PIXI.Sprite} */
      const spr = new pixi.Sprite.fromImage('/test.png')
      container.addChild(spr)

      const [r, g, b] = this.colorScale(i)
        .replace(/[^\d,]/g, '')
        .split(',')
        .map(v => +v)

      spr.tint = parseInt(
        rgb(r, g, b)
          .hex()
          .substr(1),
        16
      )

      return {
        index: i,
        x:     null,
        y:     null,
        color: this.colorScale(Math.sqrt(i))
      }
    })

    this.links = range(this.nodes.length - 1).map(i => ({
      source: Math.floor(Math.sqrt(i)),
      target: i + 1
    }))

    this.simulation = forceSimulation(this.nodes)
      .force('charge', forceManyBody().strength(-15))
      .force(
        'link',
        forceLink(this.links)
          .distance(this.zoom)
          .strength(0.6)
      )
      .force(
        'radial',
        forceRadial(height / 1.4, width / 2, height / 2).strength(0.8)
      )
      .force('mouse', forceRadial(100, width / 2, height / 2).strength(1))
      .force('center', forceCenter(width / 2, height / 2))

      .force('x', forceX())
      .force('y', forceY())
      .on('tick', this.ticked)
      .alphaDecay(0.16)
      .alpha(0.5)
      .alphaTarget(0.1)
      .tick(100)

    window.addEventListener('resize', this.onResize)
    window.addEventListener('mousemove', this.updateMouse)
  },

  methods: {
    /**
     * @type {(e: MouseWheelEvent) => void}
     */
    test(e) {
      this.zoom += e.deltaY * 0.5

      this.simulation
        .restart()
        .alphaDecay(0.0004)
        .alpha()
    },
    ticked() {
      this.simulation.force('link').distance(this.zoom)

      this.nodes.forEach((n, i) => {
        const x = n.x
        const y = n.y

        /** @type {PIXI.particles.ParticleContainer} */
        const particleContainer = this.pixiRender.stage.children[1]

        if (!particleContainer) return
        const spr = particleContainer.children[i]

        spr.position.set(x, y)
      })
    },

    dragsubject() {
      const { width, height } = this
      return this.simulation.find(event.x - width / 2, event.y - height / 2)
    },
    dragstarted() {
      this.simulation.alphaTarget(0.5).restart()
      this.dragging = true
    },

    /**
     * @param {MouseEvent} e
     */
    dragged() {
      this.simulation.alphaTarget(0.5).restart()
      this.dragging = true
      if (!this.dragging) return
      /** @type {d3.ForceManyBody} */
      const { strength } = this.simulation.force('charge')

      strength(-25)

      /** @type {d3.ForceLink} */
      const f = this.simulation.force('link')
      f.strength(0.01)
    },
    dragended() {
      this.dragging = false
      this.simulation.alphaTarget(0.1).alpha(0.5)
      /** @type {d3.ForceManyBody} */
      const { strength } = this.simulation.force('charge')

      strength(-60)

      /** @type {d3.ForceLink} */
      const f = this.simulation.force('link')
      f.strength(0.7)
    },

    /**
     * @param {d3.SimulationLinkDatum<ForceTestNode>} d
     */
    drawLink(d) {
      /** @type {pixi.Graphics} */
      const g = this.pixiRender.stage.children[0]
      g.moveTo(d.source.x, d.source.y).lineTo(d.target.x, d.target.y)
    },

    onResize() {
      console.log('resize')
      this.width = innerWidth
      this.height = innerHeight
      this.pixiRender.renderer.resize(innerWidth, innerHeight)

      /** @type {PIXI.Sprite} */
      const bg = this.pixiRender.stage.children[0]
      bg.width = this.width
      bg.height = this.height

      this.pixiRender.stage.children[1].setTransform(
        this.width / 2,
        this.height / 2
      )
    },

    /** @param {MouseEvent} e */
    updateMouse(e) {
      const { x, y } = e

      /** @type {d3.ForceRadial} */
      const force = this.simulation.force('mouse')

      force.x(x).y(y)
    }
  }
}
</script>

<style scoped lang="scss">
canvas {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(#2b414f, #20313a);
}
</style>
