
function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

function Bird(brain){
    this.x = width/4;
    this.y = height/2;

    this.g = .8;
    this.v = 0;
    this.max_v = 20;
    this.score = 0;
    this.fitness = 0;

    if (brain) this.brain = brain.copy();
    else this.brain = new NeuralNetwork(5, 8, 2);


    this.show = function(){
        stroke(255);
        fill(255, 50);
        ellipse(this.x, this.y, 20, 20);
    }

    this.think = function(pipe){
        let inputs = [];
          // x position of closest pipe
          inputs[0] = map(pipe.x, this.x, width, 0, 1);
          // top of closest pipe opening
          inputs[1] = map(pipe.top, 0, height, 0, 1);
          // bottom of closest pipe opening
          inputs[2] = map(pipe.bottom, 0, height, 0, 1);
          // bird's y position
          inputs[3] = map(this.y, 0, height, 0, 1);
          // bird's y velocity
          inputs[4] = map(this.v, -5, 5, 0, 1);
          //console.log(this.v);
          //console.log(inputs);
        let out = this.brain.predict(inputs); //returns array
        //if (frameCount % 50 == 0) console.log(inputs, out[0], out[1]);
        if (out[0] > out[1]) this.up();
    }

    this.bottomTop = function() {
        // Bird dies when hits bottom?
        return (this.y > height || this.y < 0);
    }

    this.update = function(){

        this.score ++;
        this.v += this.g;
        this.y += this.v;
        
    }

    this.up = function(){
        this.v += -12;
    }
}

