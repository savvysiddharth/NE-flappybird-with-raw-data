//a square world
class World {
  constructor(size) {
    this.size = size;
    this.width = size;
    this.height = size;

    this.gravity = 0.5;
    this.speed = 2; //how speed are bars going
  }
}

let world = new World(500);