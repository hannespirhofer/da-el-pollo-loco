class Endscreen extends DrawableObject {

    x = 75;
    y = 50;
    width = 600;
    height = 400;

    constructor(gamewon) {
        super();
        if (gamewon) { // true when game won
            this.loadImage('img/9_intro_outro_screens/game_over/oh no you lost!.png');
        } else { // false when lost
            this.loadImage('img/9_intro_outro_screens/game_over/game over!.png');
        }
    }
}