import { MapChar, Coord, Actor, Window } from './classes';
import { FuncMap } from './functionalMap';

window.onload = function () {
    // Configuration vars
    let windowId: string = 'game_window';
    let rows: number = 26;
    let columns: number = 99;
    let bgChar: string = '-';
    let heroChar: string = 'A';
    let heroColor: string = 'green';

    // Interesting logic here
    // make map and window with same dimensions for now
    let map: MapChar[] = FuncMap(rows, columns, bgChar);
    //this.window = new Window(new Coord(), width, height);

    // GAME_OBJECTS
    let gameHero = new Actor(
        new MapChar(heroChar, heroColor), 
        new Coord()
    );

    // FIRST DRAW
    // contentString <- window <- actors <- map
    var gameWindow = document.getElementById(windowId);
    gameWindow.innerText = map.reduce((acc: string, val: MapChar) => {
        return acc + val.char;
    }, '');

    //  SETUP INPUT CONTROLS
    //document.addEventListener('keydown', this.inputHandler, true)
        
    //  ENTER GAME_LOOP
    //      UPDATE
    //      DRAW
};

function inputHandler (event: {defaultPrevented: any; which: any; 
    preventDefault: () => void; }) {

    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.which) {
    case 40: // down arrow
    case 74: // j
        this.move_down();
        break;
    case 38: // up arrow
    case 75: // k
        this.move_up();
        break;
    case 37: // left arrow
    case 72: // h
        this.move_left();
        break;
    case 39: // right arrow
    case 76: // l
        this.move_right();
        break;
    default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}

function move_right(): void {
}

function move_left(): void {
}

function move_up(): void {
}

function move_down(): void {
}