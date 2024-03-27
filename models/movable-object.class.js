class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
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


    /**
     * This method adds gravity to an Object.
     * If speedY is greater 0 thgan object jumps and falls due to the gravity (up and down in the same ratio).
     */
    applyGravity() {
        this.gravityAnimation = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    /**
     * This function checks if an Object (character) is Idle
     * @returns {Boolean} true if idle
     */
    isIdle() {
        let idletime = new Date().getTime() - this.lastAction; // diff in ms
        idletime = idletime / 1000; //in seconds
        return idletime < 5;
    }

    /**
     * This function checks if an Object (character) is long idle (doing nothing for more than 3s)
     * @returns {Boolean} true if longidle
     */
    isLongIdle() {
        let idletime = new Date().getTime() - this.lastAction; // diff in ms
        idletime = idletime / 1000; //in seconds
        return idletime > 5;
    }

    /**
     * This checks if an object (character) is above the ground.
     * Not valid for Throwable Objects
     * @returns {Boolean} true if is above Ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable Objects should always fall to bottom
            return true;
        } else {
            return this.y <= this.groundY;
        }
    }

    /**
     * This method check for precise collision between two objects. 
     * Example character.isColling(chicken)
     * @param {Object} mo The object is checked against the object calling the method 
     * @returns {Boolean} true if borders of the objects overflow
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * This method check for rough collision between two objects. 
     * Example character.isColling(chicken)
     * @param {Object} mo The object is checked against the object calling the method 
     * @returns {Boolean} true if borders of the objects overflow
     */
    isCollidingRough(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    /**
     * This method removes an Object by adding speedY and x and applyGravity.
     * So it falls through the ground.
     */
    removeObject() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 5;
            this.y += 10;
        }, 25)
    }

    /**
     * This method is called when an enemy collides with the character.
     * @param {Number} val val is the amount of energy to be reduced on the Object
     */
    hit(val) {
            this.energy -= val;
            this.lastHit = new Date().getTime();
            if (this.energy < 0) {
                this.energy = 0;
            }
    }

    /**
     * This method is called when a throwable Object (bottle) hits the endboss.
     * @param {Number} val  val is the amount of energy to be reduced on the Object
     */
    endbossHit(val) {
        this.energy -= val;
        this.yreduction = this.height * 3/10;
        this.height -= this.yreduction;
        this.width -= this.width * 3/10;
        this.y += this.yreduction;
        this.speed -= 4;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    /**
     * This method checks if the object was hit in a specific timeframe (.6s) in the past.
     * @returns {Boolean}
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // diff in ms
        timepassed = timepassed / 1000; //in seconds
        return timepassed < .4;
    }

    /**
     * This method checks whether the object is dead by checking its energy level.
     * @returns {Boolean}
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * This method moves an object to the right by increasing x with speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * This method moves an object to the left.
     */
    moveLeft() {
        if (this instanceof Cloud) {
            if (this.x < -this.width) {
                this.x = 2000;
            }
        }
        this.x -= this.speed;
    }

    /**
     * This method checks if an Object is less than 650px close to another. 
     * For example: character.isClose(Chicken)
     * @param {Object} mo Object to be checked against
     * @returns {Boolean}
     */
    isClose(mo) {
        return mo.x - (this.x + this.width) < 650;
    }

    /**
     * This method initiates a jump on an object by setting the speedY to greater 0.
     */
    jump(speedY) {
        if (speedY) {
            this.speedY = speedY;
        } else {
            this.speedY = 30;
        }
    }

    /**
     * This method loops with a modulus through the image array and sets the img to the object inside imageCache.
     * At the end it raises currentImage by 1
     * @param {Array} images Array with image Urls 'img/test.png','...'
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}