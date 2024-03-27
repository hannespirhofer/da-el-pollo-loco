class Interval {
    world;

    /**
     * This method clear all Intervals runnng for the game and is executed when game end.
     */
    clearAllIntervals() {
        this.clearWorldInterval();
        this.clearCharacterIntervals();
        this.clearChickenIntervals();
        this.clearPoultIntervals();
        this.clearEndbossIntervals();
        this.clearCloudIntervals();
        this.clearBottleIntervals();
    }

    /**
     * This method clears the Main Interval which is responsible for the collisions on the World
     */
    clearWorldInterval() {
        clearInterval(this.world.mainInterval)
    }
    
    /**
     * This method clears the character intervals for animating it and moving it
     */
    clearCharacterIntervals() {
        clearInterval(this.world.character.movingAnimations);
        clearInterval(this.world.character.characterAnimations);
    }
    
    /**
     * This method clears the Intervals for the Chicken
     */
    clearChickenIntervals() {
        this.world.level.enemies
            .filter(enemy => enemy instanceof Chicken)
            .forEach(enemy => {
                clearInterval(enemy.gravityAnimation);
            })
    }
    
    /**
     * This method clears the Intervals for the Poults
     */
    clearPoultIntervals() {
        this.world.level.enemies
            .filter(enemy => enemy instanceof Poult)
            .forEach(enemy => {
                clearInterval(enemy.gravityAnimation);
            })
    }
    
    /**
     * This method clears the Intervals for the Endboss
     */
    clearEndbossIntervals() {
        this.world.level.enemies
            .filter(enemy => enemy instanceof Endboss)
            .forEach(enemy => {
                clearInterval(enemy.movingAnimations);
                clearInterval(enemy.hurtAnimations);
                clearInterval(enemy.deadAnimations);
            })
    }
    
    /**
     * This method clears the Intervals for the Clouds
     */
    clearCloudIntervals() {
        this.world.level.clouds
            .forEach(cloud => {
                clearInterval(cloud.movingAnimations);
            })
    }
    
    /**
     * This method clears the Intervals for the Bottles
     */
    clearBottleIntervals() {
        this.world.throwableObjects
            .forEach(tho => {
                clearInterval(tho.gravityAnimation);
                clearInterval(tho.movingAnimations);
            })
    }
}