import { drawFrame } from 'engine/context.js';
import { FRAME_TIME, TILE_SIZE } from 'game/constants/game.js';

const FRAME_DELAY = 8 * FRAME_TIME;

export class PowerupSystem {
  image = document.querySelector('img#power-ups');
  animationFrame = 0;
  powerups = [];

  constructor(time) {
    this.animationTimer = time.previous + FRAME_DELAY;
  }

  remove = (powerup) => {
    const index = this.powerups.indexOf(powerup);
    if (index < 0) return;

    this.powerups.splice(index, 1);
  };

  add = (cell, type) => {
    this.powerups.push({
      type,
      cell,
    });
  };

  updateAnimation(time) {
    if (time.previous <= this.animationTimer) return;

    this.animationFrame = 1 - this.animationFrame;
    this.animationTimer = time.previous + FRAME_DELAY;
  }

  update(time) {
    this.updateAnimation(time);
  }

  draw(context, camera) {
    for (const powerup of this.powerups) {
      drawFrame(
        context, this.image,
        [
          8 + (this.animationFrame * TILE_SIZE),
          8 + ((powerup.type - 1) * TILE_SIZE),
          TILE_SIZE, TILE_SIZE,
        ],
        (powerup.cell.column * TILE_SIZE) - camera.position.x,
        (powerup.cell.row * TILE_SIZE) - camera.position.y,
      );
    }
  }
}
