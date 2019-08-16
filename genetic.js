/**
 * Genetic algorithm
 * @param {array} parentGen - array of parent generation
 */
function nextGeneration(parentGen) {

  let newGen = [];
  for(let i = 0 ; i < POPULATION_SIZE ; i++) {
    newGen[i] = new Ball();
  }

  //get fitness
  getFitness(parentGen);

  //natural selection
  // for(let i=0 ; i < POPULATION_SIZE ; i++) {
  //   newGen[i].brain = natureSelects(parentGen).brain.copy();
  // }

  //natural selection
  for(let i=0 ; i < POPULATION_SIZE ; i++) {
    brain1 = natureSelects(parentGen).brain.copy();
    brain2 = natureSelects(parentGen).brain.copy();

    //crossover
    for(let j=0 ; j < brain1.weights.length ; j++){
      if(Math.random() < 0.5)  {
        newGen[i].brain.weights[j] = brain1.weights[j];
      } else {
        newGen[i].brain.weights[j] = brain2.weights[j];
      }

      if(Math.random() < 0.5)  {
        newGen[i].brain.biases[j] = brain1.biases[j];
      } else {
        newGen[i].brain.biases[j] = brain2.biases[j];
      }
    }
  }

  //mutation
  mutate(newGen);

  return newGen;
}

/**
 * calcs fitness val from seconds survived
 * @param {array} Gen - array of population
 */
function getFitness(Gen) {
  let sum = 0;
  // console.log(Gen);
  for(let ball of Gen) {
    sum += ball.fitnessScore;
  }

  for(ball of Gen) {
    ball.fitnessScore = ball.fitnessScore/sum;
  }
}

function natureSelects(Gen) {
  //define seletion
  let r = random(0,1);
	let index = 0;

	while(r > 0) {
		r = r - Gen[index].fitnessScore;
		index++;
	}
	index--;

  // console.log('ball',index,'selected');
  return Gen[index];
}

function crossover(selected) {

  //define crossover

  return offspring;
}

function mutate(Gen) {
  for(ball of Gen) {
    ball.brain.mutate(0.1); //set mutation rate
  }
}