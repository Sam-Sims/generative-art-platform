// Constructor for particle
function Particle() {
    this.posistion = createVector(random(width), random(height));
    this.velocity = createVector(0, 0);
    this.accleration = createVector(0, 0);
    this.speedlimit = 3;
    this.h = 0;
    this.prevPos = this.posistion.copy();

    this.update = function () { //Updates particle - called each frame
        this.velocity.add(this.accleration); // accleration added to velocity
        this.velocity.limit(this.speedlimit);
        this.posistion.add(this.velocity); // posistion updated according to velocity
        this.accleration.mult(0);
    }

    this.applyMomentum = function (momentum) { // applies the driving force for each particle (petrol)
        this.accleration.add(momentum);
    }

    this.updatePrev = function () {
        this.prevPos.x = this.posistion.x;
        this.prevPos.y = this.posistion.y;
    }

    this.show = function () { // Draws particle on screen
        var hue = map(this.h, 255, 0, 255, 0);
        stroke(hue, 180, 180, 180);
        this.h = this.h + 1;
        if (this.h > 200) {
            this.h = 0;
        }

        strokeWeight(2);

        line(this.posistion.x, this.posistion.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }


    this.followVector = function (flowfield) {
        var x = floor(this.posistion.x / resolution); //scale down to grid
        var y = floor(this.posistion.y / resolution);
        var index = x + y * cols; // convert 2d value into 1d array
        var momentum = flowfield[index]
        this.applyMomentum(momentum)
    }

    this.detectEdges = function () {
        if (this.posistion.x > width) {
            this.posistion.x = 0;
            this.updatePrev();
        }
        if (this.posistion.x < 0) {
            this.posistion.x = width;
            this.updatePrev();
        }
        if (this.posistion.y > height) {
            this.posistion.y = 0;
            this.updatePrev();
        }
        if (this.posistion.y < 0) {
            this.posistion.y = height;
            this.updatePrev();
        }
    }
}