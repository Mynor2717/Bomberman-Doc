import { Entity } from 'engine/Entity.js';

export class BattleHud extends Entity {
  constructor(position) {
    super(position);

    this.image = document.querySelector('img#hud');
  }

  update(time, context, camera) {
    // Add your main update calls here
  }

  draw(context, camera) {
    // Add your main draw calls here
  }
}
