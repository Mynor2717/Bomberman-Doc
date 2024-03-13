export class BombSystem {

  bomb = [];

  constructor(stageCollisionMap) {
    this.stageCollisionMap = stageCollisionMap;
  }

  remove = () => {

  };

  add = (cell, time) => {
    this.bombs.push();
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
