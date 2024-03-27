class Poult extends MovableObject {

    x = 100;
    y = 390;
    height = 40;
    width = 40;
    offset = {
        top: 8,
        left: 8,
        right: 8,
        bottom: 8
    }
    speed = 0.10;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 300 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.8;
        this.animate();
    }

    /**
     * This animate method is called when creating a Poult and moves it, 
     * plays walking images and checking for attack state and dead state.
     */
    animate() {
        this.poultAnimations = setInterval(() => {
            this.poultAttack();
            if (this.isDead()) {
                this.poultDead();
            }
        }, 1000 / 20);
        this.poultWalk();
        this.poultMoveLeft();        
    }

    /**
     * This method adds the speed of the Obejct when in attack mode
     */
    poultAttack() {
        if (this.attack) {
            this.speed = 1.5;
        }
    }

    /**
     * This method is called whn object is dead. It clears the intervals, removes the object and set it to inactive.
     */
    poultDead() {
        this.active = false;
        this.playAnimation(this.IMAGES_DEAD);
        clearInterval(this.walkInt);
        clearInterval(this.moveInt);
        setTimeout(() => {
            this.removeObject();
        }, 1500)
    }

    /**
     * This method animates the walking.
     */
    poultWalk() {
        this.walkingAnimations = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 8);
    }

    /**
     * This method moves the Poult to the left
     */
    poultMoveLeft() {
        this.movingAnimations = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}