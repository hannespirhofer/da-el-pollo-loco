class Chicken extends MovableObject {

    x = 100;
    y = 360;
    height = 70;
    width = 70;
    offset = {
        top: 8,
        left: 25,
        right: 25,
        bottom: 8
    }
    speed = 0.25;
    attack = false;    

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    crushPlayed = false;
    crush_sound = new Audio('audio/crush.mp3');

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Animate function is called once when creating a Chicken and the Intervals check attack and dead state.
     * As well intervals playing walking images and moving the chicken left
     */
    animate() {
        this.chickenAnimations = setInterval(() => {
            this.chickenAttack();
            this.chickenDead();
            this.chickenDeadAudio();            
        }, 1000 / 20);

        this.walkingAnimations = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 8);

        this.movingAnimations = setInterval(() => {
            this.moveLeft();
        }, 1000/60)
    }

    chickenDead() {
        if (this.isDead()) {                
            this.active = false;
            this.playAnimation(this.IMAGES_DEAD);
            clearInterval(this.walkInt);
            clearInterval(this.moveInt);
            setTimeout(() => {                    
                this.removeObject();
            },1500)
        }
    }

    chickenAttack() {
        if (this.attack && !this.attackSoundPlayed) {
            this.speed = 1.5;
        }
    }

    chickenDeadAudio() {
        if (this.isDead() && !this.crushPlayed) {
            if (audio) {
                this.crush_sound.play();
            }
            this.crushPlayed = true;
        }
    }
}