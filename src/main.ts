import { ColorChar, Coord, Sprite, makeMap, draw, insertDivsSpans } from './map'

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


    const bgChar: string = String.fromCharCode(160);
    const heroArray: any[] = [[
        new ColorChar('@', RED),
        new ColorChar('@', WHITE),
        new ColorChar('@', BLUE)
    ],[
        new ColorChar('@', GREEN),
        '',
        new ColorChar('@', YELLOW),
    ],[
        new ColorChar('@', ORANGE),
        new ColorChar('@', PURPLE),
        new ColorChar('@', RED)
    ]];

    let sprites: Sprite[] = [new Sprite(
        heroArray, 
        new Coord()
    )];

    let idArray: any[] = insertDivsSpans(WINDOW_ID, ROWS, COLS);
    const map: any[] = makeMap(COLS, ROWS, bgChar);
    draw(idArray, map, sprites);

    document.addEventListener('keydown', function keyHandler (event: any) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.which) {
        case 40: // down arrow
        case 74: // j
        case 83: // s
            if (sprites[0].coord.row < ROWS - 1) {
                sprites[0].coord.row++;
            }
            draw(idArray, map, sprites);
            break;
        case 38: // up arrow
        case 75: // k
        case 87: // w
            if (sprites[0].coord.row > 0) {
                sprites[0].coord.row--;
            }
            draw(idArray, map, sprites);
            break;
        case 37: // left arrow
        case 72: // h
        case 65: // a
            if (sprites[0].coord.col > 0) {
                sprites[0].coord.col--;
            }
            draw(idArray, map, sprites);
            break;
        case 39: // right arrow
        case 76: // l
        case 68: // d
            if (sprites[0].coord.col < COLS - 1) {
                sprites[0].coord.col++;
            }
            draw(idArray, map, sprites);
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