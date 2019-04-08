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
data = d3.json("/miserables.json")
```

next, we construct an array of `nodes`, and an array of `links`

```javascript
// Put something here
```

Once we have nodes and links, we create a [force simulation](https://github.com/d3/d3-force) to automate the positioning. The simulation simply applies the values needed to render our content visually.

```javascript
// Put something here
```

## Implementing into Vue

Because of Vue's reactive state, we can reference the nodes and links, and observe their positioning values by writing it in the template

```html
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
```

Continue to [Canvas](/#/canvas)
