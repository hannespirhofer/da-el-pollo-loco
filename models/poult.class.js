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

    animate() {        
        // Check Interval
        this.poultAnimations = setInterval(() => {
            if (this.attack) {
                this.speed = 1.5;
            }

            if (this.isDead()) {
                this.active = false;
                this.playAnimation(this.IMAGES_DEAD);
                clearInterval(this.walkInt);
                clearInterval(this.moveInt);
                setTimeout(() => {                    
                    this.removeObject();
                },1500)
            }
        }, 1000 / 20);

        // Walk Animation Interval
        this.walkingAnimations = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 8);

        // Move Left Animation Interval
        this.movingAnimations = setInterval(() => {
            this.moveLeft();
        }, 1000/60)
    }
}