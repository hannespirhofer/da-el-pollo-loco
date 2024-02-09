class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isPickable = true;
    groundY = 130; //Attention this is not the ground y (its the character ground based on the image)
    active = true;

    // Variables for Intervals
    chickenAnimations;
    walkingAnimations;
    characterAnimations;
    movingAnimations;
    poultAnimations;
    hurtAnimations;
    deadAnimations;
    gravityAnimation;


    applyGravity() {
        this.gravityAnimation = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isIdle() {
        let idletime = new Date().getTime() - this.lastAction; // diff in ms
        idletime = idletime / 1000; //in seconds
        return idletime > 2 && idletime < 4;
    }

    isLongIdle() {
        let idletime = new Date().getTime() - this.lastAction; // diff in ms
        idletime = idletime / 1000; //in seconds
        return idletime > 6;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable Objects should always fall to bottom
            return true;
        } else {
            return this.y < this.groundY;
        }
    }

    // used for picking objects - not in use on enemies as game will get too difficult
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    isCollidingRough(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    isAbove(mo) {
        return this.y + this.height < mo.y + 20;
    }

    removeObject() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 5;
            this.y += 10;
        }, 25)
    }

    hit(val) {
        if (!this.isHurt()) {
            this.energy -= val;
            this.lastHit = new Date().getTime();
            if (this.energy < 0) {
                this.energy = 0;
            }
        }
    }

    // needed to hit endboss otherwise not every bottle hits him
    endbossHit() {
        this.energy -= 20;
        this.lastHit = new Date().getTime();
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // diff in ms
        timepassed = timepassed / 1000; //in seconds
        return timepassed < .3;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        if (this instanceof Cloud) {
            if (this.x < -this.width) {
                this.x = 2000;
            }
        }
        this.x -= this.speed;
    }

    isClose(mo) {
        return mo.x - (this.x + this.width) < 650;
    }

    jump() {
        this.speedY = 30;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    stopAnimation(intervalid) {
        clearInterval(intervalid);
    }
}