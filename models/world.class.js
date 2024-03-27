class World {

    gameEnd = false;
    gameWon = false;

    requestframeid;

    interval = new Interval();
    collision = new Collision();
    character = new Character();
    healthBar = new HealthBar(); // Character Health
    endbossBar = new EndbossBar(); // Endboss Health Bar
    bottlesBar = new BottlesBar(); // Endboss Health Bar
    coinsBar = new CoinsBar(); // Endboss Health Bar

    throwableObjects = [];
    throw;
    level = level1; // Load and set all enemies, clouds and backgroundobjects from level 1

    ctx;
    keyboard;
    camera_x = 0;

    totalBottles = 5;
    bottlePower = 30;
    bottlescore = 0;
    coinTotal = 5;
    coinscore = 0;
    bottle;

    backgroundSound = new Audio('audio/music.mp3')
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkConstantly();
        this.throwObject();
    }

    mainInterval;

    /**
     * This method sets a world object for the character
     */
    setWorld() {
        this.character.world = this;
        this.collision.world = this;
        this.interval.world = this;
    }

    playBackgroundMusic() {
        if (audio) {
            this.backgroundSound.play();
            this.backgroundSound.volume = .1;
        } else if (!audio) {
            this.backgroundSound.pause();
        }
    }

    /**
     * This method checks for ALL collisions during the game
     */
    checkConstantly() {
        this.mainInterval = setInterval(() => {
            this.collision.checkCollisions();
            this.playBackgroundMusic();
        }, 1000 / 120);
    }

    /**
     * This method checks if Key D is pressed and calls method to throw a bottle when event is triggered.
     */
    throwObject() {
        this.throwObjectsInterval = setInterval(() => {
            this.throwObjects();
        }, 1000 / 10);
    }

    /**
     * This method checks if bottles are avaiable and if so, a new Throwable Object is made and thrown.
     * Also it adjusts the bottleBar and the bottlescore accordingly.
     */
    throwObjects() {
        if (this.keyboard.D == true && this.bottlescore > 0) {
            this.bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(this.bottle);
            this.bottlescore--;
            this.bottlesBar.setPercentage(this.bottlescore * (100 / this.totalBottles));
        }
    }

    /**
     * This draws repetively all objects - images to the canvas.
     * The method repeats itself depending on the graphic card fps rates with the drawFpsReload() method. 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Moves the camera
        this.ctx.translate(this.camera_x, 0);
        this.addRelativePositionedObjects();

        // ------ BEGIN Space for Fixed objects on visible Area ---
        this.ctx.translate(-this.camera_x, 0);
        this.addAbsoluePositionedObjects();
        this.ctx.translate(this.camera_x, 0);
        // ------ END Space for Fixed objects on visible Area -----

        this.ctx.translate(-this.camera_x, 0);
        this.drawFpsReload();
        this.checkGameEnd();
    }

    /**
     * This method adds all elements which are relative to the Camera and are set 
     * somewhere in the world and not always visible instantly.
     */
    addRelativePositionedObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
    }

    /**
     * This objects are objects which are absolute positioned and always visible to the user.
     * Like the health bar of the character. 
     */
    addAbsoluePositionedObjects() {

        this.addToMap(this.healthBar);
        this.addToMap(this.endbossBar);
        this.addToMap(this.bottlesBar);
        this.addToMap(this.coinsBar);

    }

    /**
     * This method reloads the draw() method based on graphic card fps rates
     */
    drawFpsReload() {
        let self = this;
        this.requestframeid = requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This checks the game end and shows the appropriate Endscreend depending if gameWon is true or not.
     */
    checkGameEnd() {
        if (this.gameEnd) {
            audio = false;
            if (this.gameWon) {                
                this.addToMap(new Endscreen(true));
                setTimeout(() => {
                    this.drawEnd();                    
                }, 1500);
            } else {
                this.addToMap(new Endscreen(false));
                setTimeout(() => {
                    this.drawEnd();                    
                }, 1500);
            }
        }
    }

    /**
     * This method call the function to clear all the game intervals and cancels the Request Animation frame to stop draw() method.
     */
    drawEnd() {
        setTimeout(() => {
            this.interval.clearAllIntervals();
            cancelAnimationFrame(this.requestframeid);
        }, 1000);
    }

    /**
     * This calls the addToMap Method for each object
     * @param {Array} objects An Array with different objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * This function checks if Object has otherDirection and calls the draw() method on the object.
     * @param {Object} obj The Object which is passed. like BackgroundObject
     * obj.drawFrame(this.ctx); can be added to draw a border to handle collisions easier.
     */
    addToMap(obj) {
        if (obj.otherDirection) {
            this.flipImage(obj);
        }
        obj.draw(this.ctx);
        if (obj.otherDirection) {
            this.flipImageBack(obj);
        }
    }

    /**
     * This saves the ctx state. 
     * Then flips the image by its X-Axis, translates the coordintes to the upper right of the object 
     * and scales the image by mirroring it. After it turns the x value of the object to negative.
     * @param {Object} mo 
     * translate remaps the 0/0 coordinates for width px to the right(x)
     * scale is needed to flip the element horizontally
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This turns the image back to its normal state by restoring the ctx and turning the x of the object to positive.
     * @param {*} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}