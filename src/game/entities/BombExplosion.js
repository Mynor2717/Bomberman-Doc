import { EXPLOSION_FRAME_DELAY } from 'game/constants/bombs.js';

export class BombExplosion {
  image = document.querySelector('img#stage');
  animationFrame = 0;


  constructor(cell, flameCells, time, onEnd) {
    this.cell = cell;
    this.flameCells = flameCells;
    this.animationTimer = time.previous + EXPLOSION_FRAME_DELAY;
    this.onEnd = onEnd;
  }

  update(time, context, camera) {
    // Add your main update calls here
  }

  draw(context, camera) {
    // Add your main draw calls here
  }
}
