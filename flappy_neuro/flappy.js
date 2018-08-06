const TOTAL = 100;
var birds = [];
var savedBirds = [];
var pipes = [];
var isPaused = false;
var frames = 0;
let slider;

function setup(){
    createCanvas(400, 600);
    for (let i = 0; i < TOTAL; i++){
        birds[i] = new Bird();
    }
    
    slider = createSlider(1, 100, 1);    
    button = createButton('Pause/Play');
    button.mousePressed(toggle);
    button2 = createButton("Reset");
    button2.mousePressed(reset);
}

function reset(){
    console.clear();
    score = 0;
    pipes = [];
    bird.y = height/2;
    loop();
}

function draw(){

    for (let n = 0; n < slider.value(); n++){

        if (frames % 150 == 0){
            pipes.push(new Pipe());
            if (pipes.length > 3) pipes.shift();
        }
        frames++;

        if (birds.length === 0) { //reset game
            console.log("generation");
            nextGeneration();
            savedBirds = [];
            pipes = [];
            frames = 0;
        }

        for (let pipe of pipes){
            var isNext = false; //whether is next pipe for bird
            pipe.update();
            //pipe.show();

            for (let i = birds.length-1; i >= 0; i--){

                let bird = birds[i];
                bird.update();
                //bird.show();

                if (pipe.hits(bird)){ //test collision
                    savedBirds.push(birds.splice(i, 1)[0]);
                }
                if (bird.bottomTop()) {
                    savedBirds.push(birds.splice(i, 1)[0]);

                }

                if (!pipe.isPassed){ 

                    if (!isNext){ //will be the first pipe in list not passed
                        isNext = true;
                        bird.think(pipe);
                    }
                }
            }
        }
    }
    //draw
    background(0);
    for (let bird of birds) bird.show();
    for (let pipe of pipes) pipe.show();
    
    
}

function toggle(){
    if (isPaused) {
        isPaused = false;
        loop();
    } else {
        isPaused = true;
        noLoop();
    }
}

 function keyPressed(){
     if (key == ' ') bird.up();
 }

