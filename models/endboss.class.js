class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    x = 2500;
    offset = {
        top: 80,
        left: 50,
        right: 50,
        bottom: 90
    }
    speed = 4;
    alerted = false;
    angry = false;
    energy = 100;
    yreduction;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_ALERTED = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    nugget_sound = new Audio('audio/chickennugget.mp3');
    gamewon_sound = new Audio('audio/win.mp3');

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERTED);
        this.animate();
    }

    /**
     * This function is called when object is being created and intervales checking the endboss state and others moving
     * the object and playing images and audios.
     */
    animate() {
        this.endbossWalk();
        this.endbossHurt();
        this.endbossDeadCheck();        
    }

    /**
     * This moves the endboss to the left closer to the character and plays images accordingly
     */
    endbossWalk() {
        this.movingAnimations = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }, 1000 / 10);
    }

    /**
     * If the endboss is hurt then an animation plays.
     */
    endbossHurt() {
        this.hurtAnimations = setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 1000 / 10);
    }

    /**
     * This method checks if the endboss is dead or angry and calls methods on each state.
     */
    endbossDeadCheck() {
        this.deadAnimations = setInterval(() => {
            if (this.isDead()) {                
                this.endbossDead();                
            } else if (this.alerted && !this.angry) {
                this.endbossAngry();
            }
        }, 1000 / 25);
    }

    /**
     * This method runs when the endboss is dead and the game/level is finished and game won.
     */
    endbossDead() {
        if (audio) {
            this.gamewon_sound.play();
        }
        this.playAnimation(this.IMAGES_DEAD);
        this.removeObject();
        // END OF THE GAME
        world.gameEnd = true;
        world.gameWon = true;
    }

    /**
     * This method runs when endboss is angry, shows differnet images and increase the speed of the endboss
     */
    endbossAngry() {
        setTimeout(() => {
            this.playAnimation(this.IMAGES_ALERTED);
            this.angry = true;
            this.speed = 12;
        }, 1200)
    }
}