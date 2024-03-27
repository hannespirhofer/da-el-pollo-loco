class Character extends MovableObject {
    x = 100;
    y = 100;
    height = 300;
    width = 80;
    offset = {
        top: 150,
        left: 40,
        right: 40,
        bottom: 30
    }
    speed = 20;
    lastAction;
    lastHit;
    deadShown = false;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    hurtPlayed = false;
    walking_sound = new Audio('audio/walk.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    dead_sound = new Audio('audio/dead.mp3');


    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.lastAction = new Date().getTime();
        this.applyGravity();
        this.animate();
    }

    /**
     * The Character animate function sets intervals for the Character States as well as Keyboard Events.
     * Depending on State and events different methods are called, values set and images or audio loaded
     */
    animate() {
        this.movingAnimations = setInterval(() => {
            this.walking_sound.pause();
            this.characterRight();
            this.characterLeft();
            this.characterJump();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.characterAnimations = setInterval(() => {
            this.characterStates();
        }, 1000 / 15);
    }

    /**
     * This checks the Keyboard Arrow Right Event, moves the character to the right and plays a walking audio.
     * As well it sets otherDirection to false which is needed to mirror the image to the right.
     */
    characterRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.lastAction = new Date().getTime();
            this.otherDirection = false;
            this.moveRight();
            if (audio) {
                this.walking_sound.play();
            }
        }
    }

    /**
     * This checks the Keyboard Arrow Left Event, moves the character to the left and plays a walking audio.
     * As well it sets otherDirection to true which is needed to mirror the image to the left.
     */
    characterLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.lastAction = new Date().getTime();
            this.otherDirection = true;
            this.moveLeft();
            if (audio) {
                this.walking_sound.play();
            }
        }
    }

    /**
     * This checks the Keyboard Space Event, moves the character upwards and plays a jump audio.
     * It calls the jump() method which initiates the jump of the character.
     */
    characterJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.lastAction = new Date().getTime();
            this.jump();
            if (audio) {
                this.jumping_sound.play();
            }
        }
    }

    /**
     * This method checks the states of the character and play Images accordingly.
     */
    characterStates() {
        if (this.isDead() && !this.deadShown) {
            this.gameOverState();
        }  else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.playCharacterHurtAudio();
        } else if (this.isLongIdle()) {
            this.playAnimation(this.IMAGES_LONGIDLE);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.isIdle()) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * This is called when the character is dead an the game is over.
     * This plays a dead animation and calls animate Dead method.
     */
    gameOverState() {
        world.gameEnd = true;
        world.gameLost = true;
        this.playAnimation(this.IMAGES_DEAD);
        this.animateDead();
    }

    /**
     * This checks if character is Hurt and plays audio if so.
     */
    playCharacterHurtAudio() {
        if (this.isHurt() && !this.hurtPlayed) {
            this.hurt_sound.play();
            this.hurtPlayed = true;
        }
    }

    /**
     * This animate the characters dead by playing audio and rendering images
     */
    animateDead() {
        this.deadShown = true;
        if (audio) {
            this.dead_sound.play();
        }
        setTimeout(() => {
            clearInterval(this.characterAnimations);
            clearInterval(this.movingAnimations);
            this.loadImage(this.IMAGES_DEAD[3]);
            clearInterval(this.world.level.enemies[6].movingAnimations);
        }, 1000);
    }
}