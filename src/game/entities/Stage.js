import { Entity } from 'engine/Entity.js';
import { drawTile } from 'engine/context.js';
import {
  STAGE_MAP_MAX_SIZE,
  CollisionTile,
  MapCollisionTileLookup,
  stageData,
} from 'game/constants/LevelData.js';
import { TILE_SIZE } from 'game/constants/game.js';

export class Stage extends Entity {

  tileMap = structuredClone(stageData.tiles);
  collisionMap = stageData.tiles.map((row) => row.map((tile) => MapCollisionTileLookup[tile]));

  image = document.querySelector('img#stage');
  stageImage = new OffscreenCanvas(STAGE_MAP_MAX_SIZE, STAGE_MAP_MAX_SIZE);

  constructor() {
    super({ x: 0, y: 0 });

    this.stageImageContext = this.stageImage.getContext('2d');

    this.buildStageMap();
  }

  getCollisionTileAt = (cell) => {
    return this.collisionMap[cell.row][cell.column] ?? CollisionTile.EMPTY;
  };


  updateMapAt = (cell, tile) => {
    this.tileMap[cell.row][cell.column] = tile;
    this.collisionMap[cell.row][cell.column] = MapCollisionTileLookup[tile];


    drawTile(this.stageImageContext, this.image, tile, cell.column * TILE_SIZE, cell.row * TILE_SIZE, TILE_SIZE);
  };

  buildStageMap() {
    for (let rowIndex = 0; rowIndex < this.tileMap.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.tileMap[rowIndex].length; columnIndex++) {
        const tile = this.tileMap[rowIndex][columnIndex];
        this.updateMapAt({ row: rowIndex, column: columnIndex }, tile);
      }
    }
  }


  // buildStage() {
  //   this.buildStageMap();
  //   this.addBlocks();
  // }


  update = () => undefined;

  draw(context, camera) {
    context.drawImage(this.stageImage, -camera.position.x, -camera.position.y);
  }
}


