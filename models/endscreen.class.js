class Endscreen extends DrawableObject {

    x = 0;
    y = 0;
    width = 720;
    height = 480;

    constructor(gamewon) {
        super();
        if (gamewon) {
            this.loadImage('img/9_intro_outro_screens/game_over/game won.png');
        } else {
            this.loadImage('img/9_intro_outro_screens/game_over/game over!.png');
        }
    }
}