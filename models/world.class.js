class World {
    gameEnd = false;
    gameWon = false;

    requestframeid;

    movableObject = new MovableObject();
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

    bottlescore = 0;
    coinscore = 0;
    bottle;

    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
        this.throwObject();
    }

    mainInterval;

    //this function sets a world object for the character
    setWorld() {
        this.character.world = this;
    }

    //Interval 60tps to check collisions and if game is over
    checkCollision() {
        this.mainInterval = setInterval(() => {
            // Check collisions
            this.checkCollisions();
        }, 1000 / 60);
    }

    // Interval 10 fps to check throw Objects
    throwObject() {
        this.throwObjectsInterval = setInterval(() => {
            // Check throwobjects
            this.throwObjects();
        }, 1000 / 10);
    }

    throwObjects() {
        if (this.keyboard.D == true && this.bottlescore > 0) {
            this.bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(this.bottle);
            this.bottlescore--;
            this.bottlesBar.setPercentage(this.bottlescore * 100 / 5);
        }
    }

    checkCollisions() {
        // Character hitting Poult OR Chicken        
        this.level.enemies
            .filter(enemy => enemy instanceof Poult || enemy instanceof Chicken)
            .forEach(enemy => {
                if (this.character.isCollidingRough(enemy) && this.character.isAbove(enemy) && enemy.active) {
                    enemy.energy = 0;
                    clearInterval(enemy.walkingAnimations);
                    clearInterval(enemy.movingAnimations);
                };
            })

        // Poult hitting Character
        this.level.enemies
            .filter(enemy => enemy instanceof Poult)
            .forEach(enemy => {
                if (this.character.isCollidingRough(enemy) && !this.character.isAbove(enemy) && enemy.active) {
                    this.character.hit(10);
                    this.healthBar.setPercentage(this.character.energy);
                }
            })

        // Chicken hitting Character
        this.level.enemies
            .filter(enemy => enemy instanceof Chicken)
            .forEach(enemy => {
                if (this.character.isCollidingRough(enemy) && !this.character.isAbove(enemy) && enemy.active) {
                    this.character.hit(50);
                    this.healthBar.setPercentage(this.character.energy);
                }
                if (enemy.x - this.character.x + this.character.width < 350) {
                    enemy.attack = true;
                }
            })

        // Logic for Endboss  
        this.level.enemies
            .filter(enemy => enemy instanceof Endboss)
            .forEach(enemy => {
                if (this.character.isCollidingRough(enemy) && enemy.active) {
                    this.character.energy = 0;
                    this.healthBar.setPercentage(this.character.energy);
                };
            })

        // Character hitting the endboss with a throwable Object(bottle)
        this.throwableObjects.forEach((bottle) => {
            let endboss = this.level.enemies[this.level.enemies.length - 1];
            if (endboss.isCollidingRough(bottle) && bottle.active) {
                endboss.endbossHit();
                bottle.splash();
                this.endbossBar.setPercentage(endboss.energy);
                bottle.active = false;
            }
        })

        // Picking bottles
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.bottlescore < 5 && bottle.isPickable) {
                bottle.isPickable = false;
                this.bottlescore += 1;
                this.bottlesBar.setPercentage(this.bottlescore * 20);
                bottle.removeObject();
                this.bottle_sound.play();
            };
        });

        // Picking Coins
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.coinscore < 5 && coin.isPickable) {
                coin.isPickable = false;
                this.coinscore += 1;
                this.coinsBar.setPercentage(this.coinscore * 20);
                coin.removeObject();
                this.coin_sound.play();
            };
        });

        // Checking if endboss is close to the character
        if (this.character.isClose(this.level.enemies[this.level.enemies.length - 1])) {
            this.level.enemies[this.level.enemies.length - 1].alerted = true;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Moves the camera
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        // ------ BEGIN Space for fixed objects ------------
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.endbossBar);
        this.addToMap(this.bottlesBar);
        this.addToMap(this.coinsBar);
        this.ctx.translate(this.camera_x, 0);
        // ------ END Space for fixed objects ------------

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // This reloads the draw() method based on graphic card fps rates
        let self = this;
        this.requestframeid = requestAnimationFrame(function () {
            self.draw();
        });

        if (this.gameEnd) {
            if (this.gameWon) {
                this.addToMap(new Endscreen(true));
                this.drawEnd();
            } else {
                this.addToMap(new Endscreen(false));
                this.drawEnd();
            }

        }
    }

    drawEnd() {
        setTimeout(() => {
            this.clearAllIntervals();
            cancelAnimationFrame(this.requestframeid);
        }, 1000);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(obj) {
        if (obj.otherDirection) {
            this.flipImage(obj);
        }

        obj.draw(this.ctx);
        //obj.drawFrame(this.ctx);

        if (obj.otherDirection) {
            this.flipImageBack(obj);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        // translate remaps the 0/0 coordinates for width px to the right(x)
        this.ctx.translate(mo.width, 0);
        //this is needed to flip the element horizontally
        this.ctx.scale(-1, 1);
        //mirror x coordinate
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    clearAllIntervals() {
        //Clear interval checking if game is running anbd checking for collisions on World
        clearInterval(this.mainInterval)

        // For the character
        clearInterval(this.character.movingAnimations);
        clearInterval(this.character.characterAnimations);

        // For chicken intervals
        this.level.enemies
            .filter(enemy => enemy instanceof Chicken)
            .forEach(enemy => {
                /* clearInterval(enemy.chickenAnimations);
                clearInterval(enemy.walkingAnimations);
                clearInterval(enemy.movingAnimations); */
                clearInterval(enemy.gravityAnimation);
            })

        // For poult intervals
        this.level.enemies
            .filter(enemy => enemy instanceof Poult)
            .forEach(enemy => {
                /* clearInterval(enemy.poultAnimations);
                clearInterval(enemy.walkingAnimations);
                clearInterval(enemy.movingAnimations); */
                clearInterval(enemy.gravityAnimation);
            })

        // For endboss intervals
        this.level.enemies
            .filter(enemy => enemy instanceof Endboss)
            .forEach(enemy => {
                clearInterval(enemy.movingAnimations);
                clearInterval(enemy.hurtAnimations);
                clearInterval(enemy.deadAnimations);
            })

        //backgroundobjects clouds etc
        this.level.clouds
            .forEach(cloud => {
                clearInterval(cloud.movingAnimations);
            })

        // bottles gravity
        this.throwableObjects
            .forEach(tho => {
                clearInterval(tho.gravityAnimation);
                clearInterval(tho.movingAnimations);
            })
    }
}