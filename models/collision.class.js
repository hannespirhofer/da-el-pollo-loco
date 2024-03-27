class Collision {

    world;

    checkCollisions() {
        this.characterHitEnemy();
        this.poultHitCharacter();
        this.chickenHitCharacter();
        this.endbossHitCharacter();
        this.characterHitEndbossWithBottle();
        this.pickBottles();
        this.pickCoins();
        this.endbossClose();
    }

    /**
     * This checks if the caracter hit a Poult or a Chicken by jump on it and destroys it.
     * Sets the energy to 0, removes it from the canvas and clears all Intervals.
     */
    characterHitEnemy() {
        this.world.level.enemies
            .filter(enemy => enemy instanceof Poult || enemy instanceof Chicken || enemy instanceof Endboss)
            .forEach(enemy => {
                if (this.world.character.isCollidingRough(enemy)
                    && this.world.character.speedY < 0
                    && this.world.character.isAboveGround()
                    && enemy.active) {
                    if (enemy instanceof Endboss) {
                        this.world.character.jump(30);
                    }
                    enemy.energy = 0;
                    clearInterval(enemy.walkingAnimations);
                    clearInterval(enemy.movingAnimations);
                };
            })
    }

    /**
     * This checks if a Poult is hitting the Character and if so it reduces the character energy by 10.
     * Character energy bar is adjusted accordingly.
     */
    poultHitCharacter() {
        this.world.level.enemies
            .filter(enemy => enemy instanceof Poult)
            .forEach(enemy => {
                if (this.world.character.isColliding(enemy) && enemy.active && !this.world.character.isHurt()) {
                    this.world.character.hit(10);
                    this.world.character.lastAction = new Date().getTime();
                    this.world.healthBar.setPercentage(this.world.character.energy);
                }
            })
    }

    /**
     * This checks if a Chicken is hitting the Character and if so it reduces the character energy by 40.
     * Character energy bar is adjusted accordingly.
     */
    chickenHitCharacter() {
        this.world.level.enemies
            .filter(enemy => enemy instanceof Chicken)
            .forEach(enemy => {
                if (this.world.character.isColliding(enemy) && enemy.active && !this.world.character.isHurt()) {
                    this.world.character.hit(40);
                    this.world.character.lastAction = new Date().getTime();
                    this.world.healthBar.setPercentage(this.world.character.energy);
                }
                if (enemy.x - this.world.character.x + this.world.character.width < 350) {
                    enemy.attack = true;
                }
            })
    }

    /**
     * This checks if endboss hits the caracter and if so the character is dead by setting the energy to 0.
     */
    endbossHitCharacter() {
        this.world.level.enemies
            .filter(enemy => enemy instanceof Endboss)
            .forEach(enemy => {
                if (this.world.character.isColliding(enemy) && enemy.active) {
                    this.world.character.energy = 0;
                    this.world.character.lastAction = new Date().getTime();
                    this.world.healthBar.setPercentage(this.world.character.energy);
                };
            })
    }

    /**
     * This checks if the endboyy gets hit by a tabasco bottle hurl, and if so the energy of the endboss is reduced,
     * the bottle splases and is removed. The endboss bar is adjusted acoordingly and the bottle is set to inactive.
     */
    characterHitEndbossWithBottle() {
        this.world.throwableObjects.forEach((bottle) => {
            let endboss = this.world.level.enemies[this.world.level.enemies.length - 1];
            if (endboss.isColliding(bottle) && bottle.active) {
                endboss.endbossHit(this.world.bottlePower);
                this.world.bottle.splash();
                this.world.bottle.removeObject();
                this.world.endbossBar.setPercentage(endboss.energy);
                bottle.active = false;
            }
        })
    }

    /**
     * This checks a collision between character and a bottle. If so the bottlescore for the character increases, 
     * a sound plays and the bottle will be removed.
     */
    pickBottles() {
        this.world.level.bottles.forEach((bottle) => {
            if (this.world.character.isColliding(bottle) && this.world.bottlescore < 5 && bottle.isPickable) {
                bottle.isPickable = false;
                this.world.bottlescore += 1;
                this.world.bottlesBar.setPercentage(this.world.bottlescore * 20);
                bottle.removeObject();
                if (audio) {
                    this.world.bottle_sound.play();
                }
            };
        });
    }

    /**
     * This checks a collision between character and a coin. If so the coinscore for the character increases, 
     * a sound plays and the bottle will be removed.
     */
    pickCoins() {
        this.world.level.coins.forEach((coin) => {
            if (this.world.character.isColliding(coin) && this.world.coinscore < this.world.coinTotal && coin.isPickable) {
                coin.isPickable = false;
                this.world.coinscore += 1;
                this.world.coinsBar.setPercentage(this.world.coinscore * (100 / this.world.coinTotal));
                coin.removeObject();
                if (audio) {
                    this.world.coin_sound.play();
                }
            };
        });
    }

    /**
     * This checks if the endboss is close to the character and sets alerted variable of the endboss to true.
     */
    endbossClose() {
        if (this.world.character.isClose(this.world.level.enemies[this.world.level.enemies.length - 1])) {
            this.world.level.enemies[this.world.level.enemies.length - 1].alerted = true;
        }
    }
}