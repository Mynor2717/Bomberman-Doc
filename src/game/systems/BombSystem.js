import { CollisionTile } from 'game/constants/LevelData.js';
import { FlameDirectionLookup } from 'game/constants/bombs.js';
import { Bomb } from 'game/entities/Bomb.js';

export class BombSystem {
  bombs = [];

  constructor(stageCollisionMap) {
    this.collisionMap = stageCollisionMap;
  }

  getFlameCellsFor(rowOffset, columnOffset, startcell, length) {
    const flameCells = [];
    let cell = { ...startcell };

    for (let position = 1; position <= length; position++) {
      cell.row += rowOffset;
      cell.column += columnOffset;

      if (this.collisionMap[cell.row][cell.column] !== CollisionTile.EMPTY) break;

      flameCells.push({
        cell: { ...cell },
        isVertical: rowOffset !== 0,
        isLast: position === length,
      });
    }

    return flameCells;
  }

  getFlameCells(startcell, length, time) {
    const flameCells = [];

    for (const [rowOffset, columnOffset] of FlameDirectionLookup) {
      const cells = this.getFlameCellsFor(rowOffset, columnOffset, startcell, length);

      if (cells.length > 0) flameCells.push(...cells);
    }

    return flameCells;
  }

  handleBombExploded(bomb, strength, time) {
    const index = this.bombs.indexOf(bomb);
    if (index < 0) return;

    const flameCells = this.getFlameCells(bomb.cell, strength, time);
  }

  remove = (bomb) => {
    const index = this.bombs.indexOf(bomb);
    if (index < 0) return;

    this.collisionMap[bomb.cell.row][bomb.cell.column] = CollisionTile.EMPTY;
    this.bombs.splice(index, 1);
  };

  add = (cell, strength, time, onBombExploded) => {
    this.bombs.push(new Bomb(cell,
      time, (bomb) => {
        onBombExploded(bomb);
        this.handleBombExploded(bomb, strength, time);
      },
    ));

    this.collisionMap[cell.row][cell.column] = CollisionTile.BOMB;
  };

  update(time) {
    for (const bomb of this.bombs) {
      bomb.update(time);
    }
  }

  draw(context, camera) {
    for (const bomb of this.bombs) {
      bomb.draw(context, camera);
    }
  }

}
