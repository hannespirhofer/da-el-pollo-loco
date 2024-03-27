class CoinsBar extends DrawableObject {
    
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    x = 10;
    y = 100;
    width = 200;
    height = 60;



    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.setPercentage(0);
    }

    /**
     * This sets the coins bar to a given percentage
     * @param {Number} percentage Sets the percentage of the bar 
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5 and creates let percentage
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * This resolves the percentage and sets the corresponding image
     * @returns {Number} Index of Image from IMAGE Array
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    };

}