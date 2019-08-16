class Bar {
  //creates bar with x position and depending on world size (here world is just brief data of world)
  constructor(posx) {

    // this.width = 35; //fixing width of bar
    this.width = 0.07 * world.size; //35 for 500x500 (scaling based on world size)

    this.posx = posx; //right side x position

    let minGap = 200;
    let maxGap = 300;
    // let minGap = 0.2 * world.size; //(100 for 500x500) (scaling based on world size)
    // let maxGap = 0.4 * world.size; //(200 for 500x500) (scaling based on world size)

    this.topheight = random(0 , world.height - minGap);
    this.bottomheight = random(minGap + this.topheight , maxGap + this.topheight);

    this.marked = false; //should be checked for collision or not (check if false)
  }

  display() {
    noStroke();

    fill(255);

    let topbarX1 = this.posx;
    let topbarY1 = 0;
    let topbarX2 = this.posx+this.width;
    let topbarY2 = this.topheight;

    let bottombarX1 = this.posx;
    let bottombarY1 = world.height;
    let bottombarX2 = this.posx+this.width;
    let bottombarY2 = this.bottomheight;

    rectMode(CORNERS);
    rect(topbarX1 , topbarY1 , topbarX2 , topbarY2); //topbar
    rect(bottombarX1 , bottombarY1 , bottombarX2 , bottombarY2); //bottombar
  }

  move()
  {
    this.posx = this.posx - world.speed;
  }

  //returns true if marked
  markIfVisited(balldiameter) {
    let ballLeftEndx = world.width/2 - balldiameter/2 - this.width; //included width of bar
    if(this.posx < ballLeftEndx && !this.marked ) {
      this.marked = true;
      return true;
    }
    return false;
  }

}