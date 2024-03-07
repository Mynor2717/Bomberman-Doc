import { Entity } from 'engine/Entity.js';

export class LevelMap extends Entity {
  constructor() {
    super({ x: 0, y: 0 });

    this.titleMap = [...this.titleMap];
    this.image = document.querySelector('img#stage');
    this.stageImage = new OffscreenCanvas(1024, 1024);
  }

  update = () => undefined;

  draw(context, camera) {
    // Add your main draw calls here
  }
}


