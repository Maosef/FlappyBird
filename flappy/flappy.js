var bird;
pipes = [];
var isPaused = false;
var score = 0;

function setup(){
    createCanvas(400, 600);
    bird = new Bird();
    pipes.push(new Pipe());

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
    background(0);
    bird.update();
    bird.show();

    if (frameCount % 150 == 0){
        p = new Pipe();
        pipes.push(p);
        //console.log('new pipe: ' , p.top, height-p.bottom);
        if (pipes.length > 4) pipes.shift();
    }

    for (pipe of pipes){
        pipe.update();
        pipe.show();
        if (pipe.hits(bird)){ //test collision
            noLoop();
            console.log("GAME OVER");
        }

        if (pipe.x > bird.x && !pipe.isPassed){ //update score
            pipe.isPassed = true;
            score += 1;
            console.log("Score: " + score);
        }
    }
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

