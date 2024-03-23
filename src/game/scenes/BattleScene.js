import { Scene } from 'engine/Scene.js';
import { HALF_TILE_SIZE, STAGE_OFFSET_Y } from 'game/constants/game.js';
import { BattleHud } from 'game/entities/BattleHud.js';
import { Bomberman } from 'game/entities/Bomberman.js';
import { Stage } from 'game/entities/Stage.js';
import { BlockSystem } from 'game/systems/BlockSystem.js';
import { BombSystem } from 'game/systems/BombSystem.js';
import { PowerupSystem } from 'game/systems/PowerupSystem.js';

export class BattleScene extends Scene {
  players = [];

  constructor(time, camera) {
    super();

    this.stage = new Stage();
    this.hud = new BattleHud();
    this.powerupSystem = new PowerupSystem(time, this.players);
    this.blockSystem = new BlockSystem(this.stage.updateMapAt, this.stage.getCollisionTileAt, this.powerupSystem.add);
    this.bombSystem = new BombSystem(this.stage.collisionMap, this.blockSystem.add);

    this.players.push(new Bomberman(
      { x: 0.3, y: 1 },
      time,
      this.stage.getCollisionTileAt,
      this.bombSystem.add,
    ));

    camera.position = { x: HALF_TILE_SIZE, y: -STAGE_OFFSET_Y };
  }

  update(time) {
    this.powerupSystem.update(time);
    this.blockSystem.update(time);
    this.bombSystem.update(time);

    for (const player of this.players) {
      player.Update(time);
    }
  }

  draw(context, camera) {
    this.stage.draw(context, camera);
    this.hud.draw(context);

    this.powerupSystem.draw(context, camera);
    this.blockSystem.draw(context, camera);
    this.bombSystem.draw(context, camera);

    for (const player of this.players) {
      player.draw(context, camera);
    }
  }
}
