

function Bird(){
    this.x = width/4;
    this.y = height/2;

    this.g = 1;
    this.v = 0;

    this.show = function(){
        fill(255);
        ellipse(this.x, this.y, 20, 20);
    }

    this.update = function(){

        this.v += this.g;
        this.y += this.v;
        if (this.y > height){
            this.y = height;
            this.v = 0;
        }
        if (this.y < 0){
            this.y = 0;
            this.v = 0;
        }
    }

    this.up = function(){
        this.v = -15;
    }
}

function Pipe(){

    this.x = width;
    this.w = 75
    this.top = random(height-150);
    this.bottom = height - this.top - 150;
    this.isPassed = false;

    this.show = function(){
        fill(255);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);

    }

    this.update = function(){
        this.x -= 2;
    }

    this.hits = function(bird){
        if (bird.x > this.x && bird.x < this.x+this.w){
            if (bird.y < this.top || bird.y > height-this.bottom) return true;
        }
        return false;
    }

}