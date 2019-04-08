import { Graphics } from "pixi.js";

declare global {
  interface ForceTestNode {
    index: number;
    x: any;
    y: any;
    sprite: Graphics;
  }

  interface ForceTestLink<T> extends d3.ForceLink<ForceTestNode, T> {}
}