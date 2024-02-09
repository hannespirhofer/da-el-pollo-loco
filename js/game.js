let game;
let canvas;
let world;
let keyboard = new Keyboard();
let gameEndInterval;

function startGame() {
    showGameScreen();
    init();
    checkGameEnd();
}

function showGameScreen() {
    canvas = document.getElementById('canvas');
    startpage = document.getElementById('startpage');
    endpage = document.getElementById('endPage');
    helpbox = document.getElementById('help-box');

    canvas.classList.remove('d-none');
    startpage.classList.add('d-none');
    endpage.classList.add('d-none');
    helpbox.classList.add('d-none');
}

function showInfoBox() {
    console.log('hello world');
    document.getElementById('infobox').classList.remove('d-none');
}

function closeInfoBox() {
    document.getElementById('infobox').classList.add('d-none');
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function checkGameEnd() {
    gameEndInterval = setInterval(() => {
        if (world.gameEnd) {
            clearInterval(gameEndInterval);
            showEndPage();
        }
    }, 1000/20)
}

function showEndPage() {
    setTimeout(() => {
        document.getElementById('endPage').classList.remove('d-none');        
    }, 1000);
}

window.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowRight'){
        keyboard.RIGHT = true;
    }

    if (e.code == 'ArrowLeft'){
        keyboard.LEFT = true;
    }

    if (e.code == 'ArrowUp'){
        keyboard.UP = true;
    }

    if (e.code == 'ArrowDown'){
        keyboard.DOWN = true;
    }

    if (e.code == 'Space'){
        keyboard.SPACE = true;
    }

    if (e.code == 'KeyD'){
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowRight'){
        keyboard.RIGHT = false;
    }

    if (e.code == 'ArrowLeft'){
        keyboard.LEFT = false;
    }

    if (e.code == 'ArrowUp'){
        keyboard.UP = false;
    }

    if (e.code == 'ArrowDown'){
        keyboard.DOWN = false;
    }
    
    if (e.code == 'Space'){
        keyboard.SPACE = false;
    }

    if (e.code == 'KeyD'){
        keyboard.D = false;
    }
});