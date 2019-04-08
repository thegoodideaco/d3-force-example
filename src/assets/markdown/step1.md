## _The template approach uses Vue's internals to generate the svg needed to display the data_

Single File Vue components offer a template rendering syntax. Since D3 can render SVG content, we can utilize Vue by generating the markup for us.

This approach is very different than canvas or webgl, however is the one that takes advantage of Vue's internal reactive logic the most.

## `Pros`

- Composable SVG Elements as Vue Components
- Complete Vue integration
- Injects D3 logic into Vue's lifecycle

## `Cons`

- Rendering Performance

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

  // We assign these other values so that they can be observed by Vue
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

Because of Vue's reactive state, we can reference the nodes and links, and observe their positioning values by writing it in the template

```html
<template>
  <div class="template-component">
    <svg width="100%" height="100%">
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
          :y2="link.target.y"
        />
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
          :cy="node.y"
        >
          <title>{{ node.name }}, {{ node.group }}</title>
        </circle>
      </g>
    </svg>
  </div>
</template>
```

Continue to [Canvas](/#/canvas)
