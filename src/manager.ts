import { MapChar, Coord, Actor, Window } from './classes';
import { FuncMap } from './functionalMap';

class Manager {
    map: any[];
    gameObjects: any[];
    window: Window;
    gameHero: Actor;

    constructor (
        windowId: string,
        rows: number, columns: number, char: string,
        heroChar: string, heroColor: string) {

        // make map and window with same dimensions for now
        this.map = FuncMap(rows, columns, char);
        //this.window = new Window(new Coord(), width, height);

        // GAME_OBJECTS
        this.gameHero = new Actor(
            new MapChar(heroChar, heroColor), 
            new Coord()
        );

        // FIRST DRAW
        // contentString <- window <- actors <- map
        var gameWindow = document.getElementById(windowId);
        gameWindow.innerText = this.map.reduce((acc: string, val: string[]) => {
            return acc + val.reduce((iacc: string, ival: string) => {
                return iacc + ival;
            });
        }, '');

        //  SETUP INPUT CONTROLS
        //document.addEventListener('keydown', this.inputHandler, true)
            
        //  ENTER GAME_LOOP
        //      UPDATE
        //      DRAW
    }

    inputHandler (event: { defaultPrevented: any; which: any; preventDefault: () => void; }) {
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

    move_right () {
    }

    move_left () {
    }

    move_up () {
    }

    move_down () {
    }
}

export { Manager };