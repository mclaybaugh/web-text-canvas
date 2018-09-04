import { ColorChar, Coord, MapObject, makeMap, draw, insertDivsSpans } from './map'

const WHITE: string = 'white';
const RED: string = 'red';
const BLUE: string = 'blue';
const GREEN: string = 'green';
const YELLOW: string = 'yellow';
const ORANGE: string = 'orange';
const PURPLE: string = 'purple';

window.onload = function () {
    const WINDOW_ID: string = 'game_window';
    const ROWS: number = 26;
    const COLS: number = 99;


    const bgChar: string = '-';
    const heroChar: string = '@';
    let objects: MapObject[] = [new MapObject(
        new ColorChar(heroChar, GREEN), 
        new Coord()
    )];

    let idArray: any[] = insertDivsSpans(WINDOW_ID, ROWS, COLS);
    const map: any[] = makeMap(COLS, ROWS, bgChar);
    draw(idArray, map, objects);

    document.addEventListener('keydown', function keyHandler (event: any) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
    
        switch (event.which) {
        case 40: // down arrow
        case 74: // j
        case 83: // s
            if (objects[0].coord.row < ROWS - 1) {
                objects[0].coord.row++;
            }
            draw(idArray, map, objects);
            break;
        case 38: // up arrow
        case 75: // k
        case 87: // w
            if (objects[0].coord.row > 0) {
                objects[0].coord.row--;
            }
            draw(idArray, map, objects);
            break;
        case 37: // left arrow
        case 72: // h
        case 65: // a
            if (objects[0].coord.col > 0) {
                objects[0].coord.col--;
            }
            draw(idArray, map, objects);
            break;
        case 39: // right arrow
        case 76: // l
        case 68: // d
            if (objects[0].coord.col < COLS - 1) {
                objects[0].coord.col++;
            }
            draw(idArray, map, objects);
            break;
        default:
            return; // Quit when this doesn't handle the key event.
        }
    
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);
        
    //  ENTER GAME_LOOP
    //      UPDATE
    //      DRAW
};