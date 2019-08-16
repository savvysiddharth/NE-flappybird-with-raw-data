let smallsize = 28; //shrinking image to smallsize x smallsize size

class Ball {
  //brief of world
  constructor() {
    this.x = world.width / 2; //always stays on center of x-axis
    // this.y = world.height / 2;
    this.y = random(0,height);
    this.speed = 0; //normal speed of moving w/o external force in y-axis
    this.diameter = 30;
    // this.diameter = 0.06*world.size; //30 for 500x500 (scaling based on world size)
    this.radius = this.diameter / 2;

    this.thrust = -8; //thrust up while jumping
    // this.thrust = (-1) * world.size * 0.016; //scaling based on world size (-8 for 500x500)
    this.score = 0; //game score
    this.fitnessScore = 0; //fitness_score (equalvalent to duration survived)

    this.brain = new NeuralNetwork([smallsize*smallsize,64,2]);
  }

  //apply gravity and stop at ground
  applyWorldEffects() {
    //on ground!
    if(this.y >= world.height - 10) {
      this.speed = -5; //reversing by small amt
      // this.speed = 0; //stop moving
    }
    else if(this.y < 0) { //going over roof
      this.speed = 1; //reversing by small amt
      // this.speed = 0; //stop moving
    }
    else {//falling
      this.speed=this.speed + world.gravity; //gravity = 0.5
    }
  }

  keyCheck() {
    if(keyIsPressed || mouseIsPressed) {
      this.speed = this.speed - this.thrust;
    }
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x , this.y , this.diameter , this.diameter);
  }

  move() {
    this.y = this.y + this.speed;
  }

  collisionWith(bar) {
    let ballTopY = this.y - this.radius;
    let ballRightX = this.x + this.radius;
    let ballBottomY = this.y + this.radius;
    if(ballTopY <= bar.topheight && ballRightX >= bar.posx) {
      return true;
    }
    if(ballBottomY >= bar.bottomheight && ballRightX >= bar.posx) {
      return true;
    }
  }

  jump() {
    this.speed = this.thrust;
  }

  useBrain() {
    let img = get();
    img.resize(smallsize,smallsize);
    // img.save(); //WARNING!!!!!!!!
    img.loadPixels();
    // image(img,0,0);
    imgs.push(img);
    let input = [];
    for(let i = 0 ; i < smallsize*smallsize ; i++) {
      let pixel = img.pixels[i*4];
      input[i] = pixel/255.0;
    }
    let output = this.brain.feedforward(input);
    if(output[0] > output[1]) {
      this.jump();
    }
  }
}