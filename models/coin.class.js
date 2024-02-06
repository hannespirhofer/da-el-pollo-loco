class Coin extends MovableObject {

    y = 150;
    x = 300;
    offset = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    }

    constructor(x) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.height = 120;
        this.width = 120;
    }
}