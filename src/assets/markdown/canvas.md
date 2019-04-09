## _The canvas approach uses Vue as a wrapper around d3's transformation logic_

Instead of using Vue's template syntax, we construct a wrapper component to contain all od d3's rendering logic.

The component will contain logic for controlling d3 internally, attaching additional logic to it's lifecycle hooks.

## `Pros`

- Provides a more functional use case
- Better performance. More control over what is observed

## `Cons`

- More time to setup
- Additional logic involved

---

# Let's break down the steps

## Setting up D3's logic

We are going to create a [Force Directed Graph](https://github.com/d3/d3-force) that shows a network of nodes, followed by the links that connect them together.

First, let's load the dataset. We will be using a `network of character co-occurences` in _Les Misérables_

```javascript
// Load the data
const { nodes, links } = await json('/miserables.json')
```

next, we construct an array of `nodes`, and an array of `links`

```javascript
// update our nodes and links
this.links = links
this.nodes = nodes.map((v, index) => ({
  ...v,

  // We assign these other values so that
  // they can be observed by Vue
  index,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0
}))
```

Once we have nodes and links, we create a [force simulation](https://github.com/d3/d3-force) to automate the positioning. The simulation simply applies the values needed to render our content visually.

```javascript
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
```

We also need to stop it when this component is removed

```javascript

  // Stop the simulation when destroyed
  beforeDestroy() {
    if (this.simulation) {
      this.simulation.stop()
    }
  }
```

## Implementing into Vue

Since D3 will be handling the rendering, we provide a base layout to start from. We can use `v-once` or `v-pre` to disable the component from rendering it's template.

```html
<template>
  <div class="template-component">
    <canvas v-once ref="canvas" width="100%" height="100%">
      <!-- D3 Handles this -->
    </canvas>
  </div>
</template>
```

Continue to [Webgl](/#/webgl)
