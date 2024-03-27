let game;
let canvas;
let world;
let keyboard = new Keyboard();
let gameEndInterval;
let audio = true;
let menuOpen;
let smallDevice = window.matchMedia('(max-width: 1100px)');
let touchDevice = window.matchMedia('(Pointer: coarse)').matches;

window.addEventListener('keydown', startGame);

/**
 * This method hides the Start Overlay and loads the game into the canvas by init the level and call gameend function.
 * @param {Event} event Click Event
 */
function startGame(event) {
    window.removeEventListener('keydown', startGame);
    event.preventDefault();
    showGameScreen();
    initLevel();
    initGame();
    checkGameEnd();
}

/**
 * This method inits the game by creating a new World Onject and define the canvas.
 */
function initGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * This method just hides and shows different element needed to play.
 */
function showGameScreen() {
    canvas = document.getElementById('canvas');
    startpage = document.getElementById('startpage');
    endpage = document.getElementById('endPage');
    helpbox = document.getElementById('help-box');

    updateControlsBox();
    canvas.classList.remove('d-none');
    startpage.classList.add('d-none');
    endpage.classList.add('d-none');
    helpbox.classList.add('d-none');
}

/**
 * This function checks constantly if game is ended.
 */
function checkGameEnd() {
    gameEndInterval = setInterval(() => {
        if (world.gameEnd) {
            clearInterval(gameEndInterval);
            showEndPage();
            document.getElementById('overlay-icons').classList.add('d-none');
        }
    }, 1000 / 20)
}

/**
 * This adds an overlay when game is ended.
 */
function showEndPage() {
    setTimeout(() => {
        document.getElementById('endPage').classList.remove('d-none');
        document.getElementById('control-icons').classList.add('d-none');
    }, 1000);
}

/**
 * These are event listeners for the mobile control buttons.
 */
window.addEventListener('touchstart', (e) => {
    if (e.target.id == 'right') {
        keyboard.RIGHT = true;
    }

    if (e.target.id == 'left') {
        keyboard.LEFT = true;
    }

    if (e.target.id == 'space') {
        keyboard.SPACE = true;
    }

    if (e.target.id == 'd') {
        keyboard.D = true;
    }
})

/**
 * These are event listeners for the mobile control buttons.
 */
window.addEventListener('touchend', (e) => {
    if (e.target.id == 'right') {
        keyboard.RIGHT = false;
    }

    if (e.target.id == 'left') {
        keyboard.LEFT = false;
    }

    if (e.target.id == 'space') {
        keyboard.SPACE = false;
    }

    if (e.target.id == 'd') {
        keyboard.D = false;
    }
})

/**
 * These are event listeners for the keyboard events needed for the game.
 */
window.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }

    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }

    if (e.code == 'ArrowUp') {
        keyboard.UP = true;
    }

    if (e.code == 'ArrowDown') {
        keyboard.DOWN = true;
    }

    if (e.code == 'Space') {
        keyboard.SPACE = true;
    }

    if (e.code == 'KeyD') {
        keyboard.D = true;
    }
});

/**
 * These are event listeners for the keyboard events needed for the game.
 */
window.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }

    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }

    if (e.code == 'ArrowUp') {
        keyboard.UP = false;
    }

    if (e.code == 'ArrowDown') {
        keyboard.DOWN = false;
    }

    if (e.code == 'Space') {
        keyboard.SPACE = false;
    }

    if (e.code == 'KeyD') {
        keyboard.D = false;
    }
});

/**
 * This method toggles the Audio.
 * @param {Object} event 
 */
function toggleAudio(event) {
    const audioimg = document.getElementById('audioimg');
    event.preventDefault();
    if (event.type === 'touchstart' || event.type === 'click') {
        if (!audio) {
            audioimg.src = "img/sound.png";
            audio = true;
        } else {
            audioimg.src = "img/no-sound.png";
            audio = false;
        }
    }
}

/**
 * This method toggles the Fullscreen.
 * @param {Object} event 
 */
function toggleFullScreen(event) {
    let elem = document.getElementById('mainContainer');
    event.preventDefault();
    if (event.type === 'click' || event.type === 'touchstart') {
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch((err) => {
                alert(
                    `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
                );
            });
        } else {
            document.exitFullscreen();
        }
    }
}

/**
 * This method toggles the Audio.
 * @param {Object} event 
 */
function toggleMenu(event) {
    let el = document.getElementById('help-box');
    if (event) { event.preventDefault(); }
    if (el.classList.contains('d-none')) {
        el.classList.remove('d-none');
    } else {
        el.classList.add('d-none');
    }
}

/**
 * This method toggles the Infobox.
 * @param {Object} event 
 */
function toggleInfobox(event) {
    let el = document.getElementById('infobox');
    event.preventDefault();
    if (event.type === 'click' || event.type === 'touchstart') {
        if (el.classList.contains('d-none')) {
            el.classList.remove('d-none');
        } else {
            el.classList.add('d-none');
            toggleMenu();
        }
    }
}

/**
 * This method toggles the Helpbox (Menu).
 */
function updateHelpbox() {
    let el = document.getElementById('help-box');
    if (smallDevice.matches) {
        el.classList.add('d-none');
        menuOpen = false;
    } else {
        el.classList.remove('d-none');
        menuOpen = true;
    }
}

/**
 * This method update the Mobile Control Buttons based on the touchDevice value.
 */
function updateControlsBox() {
    let el = document.getElementById('control-icons');
    if (touchDevice) {
        el.classList.remove('d-none');
    }
}

/**
 * This method runs each time the body resizes and updates the ControlsBox and the Menubox if needed.
 */
document.getElementsByTagName("body")[0].onresize = updateHelpbox, updateControlsBox;