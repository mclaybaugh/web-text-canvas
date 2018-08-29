import { Map, MapChar, Coord, Actor, Window } from './map';

class Manager {
    map: Map;
    gameObjects: any[];
    window: Window;
    gameHero: Actor;

    constructor (char: string, width: number, height: number, heroChar: string, heroColor: string) {
        // make map and window with same dimensions for now
        //  SETUP
        //      MAP
        this.map = new Map(char, width, height);

        //      GAME_OBJECTS
        //          HERO
        this.gameHero = new Actor(
            new MapChar(heroChar, heroColor), 
            new Coord()
        );

        //      WINDOW
        this.window = new Window(new Coord(), width, height);

        //      FIRST DRAW
        // contentString <- window <- actors <- map
        var gameWindow = document.getElementById('game-window');
        gameWindow.innerText = this.map.contentString;

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