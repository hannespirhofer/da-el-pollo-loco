let game;
let canvas;
let world;
let keyboard = new Keyboard();
let gameEndInterval;
let audio = true;

function startGame() {
    showGameScreen();
    initLevel();
    init();    
    checkGameEnd();
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function toggleAudio() {
    const audioimg = document.getElementById('audioimg');
    if (!audio) {
        audioimg.src = "img/sound.png";
        audio = true;
    } else {
        audioimg.src = "img/no-sound.png";
        audio = false;        
    }
}

function showGameScreen() {
    canvas = document.getElementById('canvas');
    startpage = document.getElementById('startpage');
    endpage = document.getElementById('endPage');
    helpbox = document.getElementById('help-box');

    canvas.classList.remove('d-none');
    startpage.classList.add('d-none');
    endpage.classList.add('d-none');
    //helpbox.classList.add('d-none');
}

function showInfoBox() {
    document.getElementById('infobox').classList.remove('d-none');
}

function closeInfoBox() {
    document.getElementById('infobox').classList.add('d-none');
}

function checkGameEnd() {
    gameEndInterval = setInterval(() => {
        if (world.gameEnd) {
            clearInterval(gameEndInterval);
            showEndPage();
            document.getElementById('overlay-icons').classList.add('d-none');
        }
    }, 1000 / 20)
}

function showEndPage() {
    setTimeout(() => {
        document.getElementById('endPage').classList.remove('d-none');
    }, 1000);
}

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

function toggleFullScreen() {
    let elem = document.querySelector('html');

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