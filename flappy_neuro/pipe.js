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