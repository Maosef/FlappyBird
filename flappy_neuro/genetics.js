
function nextGeneration(){
    //birds = savedBirds.copy();
    calcFitness();

    for (let i=0; i < TOTAL; i++){
        birds[i] = reproduce(); //select one bird
    }
}

function reproduce(){

    var index = 0;
    var r = random(1);

    while (r > 0){
        r -= savedBirds[index].fitness;
        index++;
    }
    index--;

    let bird = savedBirds[index];
    let child = new Bird(bird.brain);
    //child.brain.mutate(0.1);
    return child;
}

function calcFitness(){

    let total = 0;
    for (let bird of savedBirds) total += bird.score;
    for (let bird of savedBirds) bird.fitness = bird.score/total; //normalize

}