import { MapChar, Coord, MapObject, Window } from './classes';
import { FuncMap } from './functionalMap';

const WHITE: string = 'white';
const RED: string = 'red';
const BLUE: string = 'blue';
const GREEN: string = 'green';
const YELLOW: string = 'yellow';
const ORANGE: string = 'orange';
const PURPLE: string = 'purple';

window.onload = function () {
    // Configuration vars
    let windowId: string = 'game_window';
    let rows: number = 26;
    let columns: number = 99;
    let bgChar: string = '-';
    let heroChar: string = '@';
    let heroColor: string = GREEN;

    // Interesting logic here
    // make map and window with same dimensions for now
    let map: MapChar[] = FuncMap(rows, columns, bgChar);
    //this.window = new Window(new Coord(), width, height);

    // GAME_OBJECTS
    let gameObjects: MapObject[] = [];
    gameObjects.push(new MapObject(
        new MapChar(heroChar, heroColor), 
        new Coord()
    ));

    // FIRST DRAW
    // contentString <- window <- objects <- map
    let gameWindow = document.getElementById(windowId);
    gameWindow.innerText = applyObjects(map, gameObjects)
        .reduce((acc: string, val: MapChar) => {
            return acc + val.char;
        }, '');

    //  SETUP INPUT CONTROLS
    //document.addEventListener('keydown', this.inputHandler, true)
        
    //  ENTER GAME_LOOP
    //      UPDATE
    //      DRAW
};

function applyObjects (map: MapChar[], gameObjects: MapObject[]): MapChar[] {
    // for each gameObject, place into map at object coord
    for (let i in gameObjects) {
        map[gameObjects[i].coord.x * gameObjects[i].coord.y] = gameObjects[i].mapChar;
    }
    return map;
}

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