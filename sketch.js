const TOTAL_BARS = 10; //bars per level
const BAR_SPACE = 200;

const POPULATION_SIZE = 2;

let ball;

let bars = []; //array of bar objects

let balls = []; //array of balls(current whole population)

let lastGenPopulation = []; //it will store parent generation

function setup() {

  // ball = new Ball(world.brief);

  for(let i = 0 ; i < POPULATION_SIZE ; i++) {
    balls[i] = new Ball();
  }

  for(let i = 0 ; i < TOTAL_BARS ; i++) {
    const {width} = world;
    bars[i] = new Bar(width + (i * 30) + (i * BAR_SPACE));
  }

  createCanvas(world.width,world.height);
  background(0);
}

let currentBall = 0; //start with first member in population
let gen=0;

let balldiameter = 30;
let simulationSpeed = 1;

let highScore = -1;
let score = 0;

let imgs = [];

function draw() {
  background(0);

  for(let ctr=0 ; ctr < simulationSpeed ; ctr++) {

    let nextbar = 0; //stores upcoming bar (according to view of ball)
    for(let i = 0 ; i < TOTAL_BARS ; i++) {
      if(!bars[i].marked){
        nextbar = bars[i]; //first unmarked is nextbar
        break;
      }
    }

    for(let k in balls) {
      background(0);
      for(let i = 0 ; i < TOTAL_BARS ; i++) {
        bars[i].display();
      }
      balls[k].display();

      balls[k].useBrain();
      balls[k].applyWorldEffects();
      balls[k].move();
      balls[k].fitnessScore++;

      if(nextbar != null) {
        if(balls[k].collisionWith(nextbar)) {
          lastGenPopulation.push(balls[k]);
          balls.splice(k,1);
        }
      }
    }

    for(let i = 0 ; i < TOTAL_BARS ; i++) {
      bars[i].display();
    }
  
    for(ball of balls) {
      ball.display();
    }

    for(let i = 0 ; i < TOTAL_BARS ; i++) {
      bars[i].move();
      let justmarked = bars[i].markIfVisited(balldiameter);
      if(justmarked) {
        score++;
        document.querySelector("#scorebox").innerHTML = score;
        if(score > highScore) {
          document.querySelector("#highbox").innerHTML = score;
          highScore = score;
        }
      }
    }
  
    if(balls.length == 0) {
      resetBars();
      balls = nextGeneration(lastGenPopulation);
      gen++;
      score = 0;
      document.querySelector("#scorebox").innerHTML = score;
      document.querySelector("#genbox").innerHTML = gen;
      lastGenPopulation = [];
    }

    if(isLastBarGone()) {
      resetBars(); //reset all bars
    }

  }
}

function keyPressed() {
  balls[currentBall].jump(); //thrust up
}

function mousePressed() {
  // noLoop();
}

//FUNCTIONS FOR BARS
function resetBars() {
  bars = []; //dereferencing old bars (imp)
  for(let i = 0 ; i < TOTAL_BARS ; i++) {
    bars[i] = new Bar(world.width+(i*30)+(i*BAR_SPACE));
  }
}

function isLastBarGone() {
  let lastBar = TOTAL_BARS - 1; //index of last bar
  if(bars[lastBar].posx <= -bars[lastBar].width) {
    return true;
  }
  return false;
}