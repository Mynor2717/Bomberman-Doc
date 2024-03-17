import { drawTile } from 'engine/context.js';
import {
  BASE_BOTTOM_LAST_FRAME,
  BASE_FRAME, BASE_HORIZONTAL_FRAME,
  BASE_LEFT_LAST_FRAME, BASE_RIGHT_LAST_FRAME,
  BASE_TOP_LAST_FRAME, BASE_VERTICAL_FRAME,
  EXPLOSION_ANIMATION, EXPLOSION_FRAME_DELAY,
  FLAME_ANIMATION,
} from 'game/constants/bombs.js';
import { TILE_SIZE } from 'game/constants/game.js';

export class BombExplosion {
  image = document.querySelector('img#stage');
  animationFrame = 0;


  constructor(cell, flameCells, time, onEnd) {
    this.cell = cell;
    this.flameCells = flameCells;
    this.animationTimer = time.previous + EXPLOSION_FRAME_DELAY;
    this.onEnd = onEnd;
  }

  getBaseFrame(flamecell) {
    if (!flamecell.isVertical && !flamecell.isLast) {
      return BASE_HORIZONTAL_FRAME;
    } else if (flamecell.isVertical && !flamecell.isLast) {
      return BASE_VERTICAL_FRAME;
    } else if (!flamecell.isVertical && flamecell.isLast) {
      return flamecell.cell.column < this.cell.column ? BASE_LEFT_LAST_FRAME : BASE_RIGHT_LAST_FRAME;
    } else if (flamecell.isVertical && flamecell.isLast) {
      return flamecell.cell.row < this.cell.row ? BASE_TOP_LAST_FRAME : BASE_BOTTOM_LAST_FRAME;
    }
  }

  updateAnimation(time) {
    if (time.previous < this.animationTimer) return;

  }

  update(time) {
    this.updateAnimation(time);

    this.animationFrame += 1;
    this.animationTimer = time.previous + EXPLOSION_FRAME_DELAY;

    if (this.animationFrame < EXPLOSION_ANIMATION.length) return;

    this.animationFrame = 0;
    this.onEnd(this);
  }

  draw(context, camera) {
    drawTile(
      context, this.image,
      BASE_FRAME + EXPLOSION_ANIMATION[this.animationFrame],
      (this.cell.column * TILE_SIZE) - camera.position.x,
      (this.cell.row * TILE_SIZE) - camera.position.y,
      TILE_SIZE,
    );


    for (const flamecell of this.flameCells) {
      const baseFrame = this.getBaseFrame(flamecell);

      drawTile(
        context, this.image,
        baseFrame + FLAME_ANIMATION[this.animationFrame],
        (flamecell.cell.column * TILE_SIZE) - camera.position.x,
        (flamecell.cell.row * TILE_SIZE) - camera.position.y,
        TILE_SIZE,
      );
    }
  }
}
