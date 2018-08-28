import { Map, MapChar, Coord, Actor, Window } from './map.js'

class Manager {
    constructor (char, width, height, heroChar, heroColor) {
        // make map and window with same dimensions for now
        //  SETUP
        //      MAP
        this.map = new Map(char, width, height)
        //      GAME_OBJECTS
        //          HERO
        this.gameObjects = []
        this.gameObjects['hero'] = new Actor(
            new MapChar(heroChar, heroColor), 
            new Coord()
        )
        //      WINDOW
        this.window = new Window(new Coord(), width, height)

        //      FIRST DRAW

        //  ENTER GAME_LOOP
        //      UPDATE
        //      DRAW
    }
}

export { Manager }