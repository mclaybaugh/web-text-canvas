const WHITE: string = 'white';
const RED: string = 'red';
const BLUE: string = 'blue';
const GREEN: string = 'green';
const YELLOW: string = 'yellow';
const ORANGE: string = 'orange';
const PURPLE: string = 'purple';

class ColorChar {
    public char: string;
    public color: string;

    constructor (char: string, color: string = '') {
        this.char = char;
        this.color = color;
    }
}

class Coord {
    public row: number;
    public col: number;

    constructor (row: number = 0, col: number = 0) {
        this.row = row;
        this.col = col;
    }
}
class MapObject {
    public colorChar: ColorChar;
    public coord: Coord;

    constructor (colorChar: ColorChar, coord: Coord) {
        this.colorChar = colorChar;
        this.coord = coord;
    }
}

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

function makeMap (cols: number, rows: number, bgChar: string): any[] {
    let array: any[] = [];
    for (let i = 0; i < rows; i++) {
        array[i] = [];
        for (let j = 0; j < cols; j++) {
            array[i][j] = new ColorChar(bgChar);
        }
    }
    return array;
}

function applyObjects (map: any[], objects: MapObject[]): any[] {
    let newMap: any[] = [];
    for (let i = 0; i < map.length; i++) {
        newMap[i] = map[i].slice();
    }
    for (let i = 0; i < objects.length; i++) {
        newMap[objects[i].coord.row][objects[i].coord.col] = objects[i].colorChar;
    }
    return newMap;
}

function draw (idArray: any[], map: any[], objects: MapObject[]): void {
    let mapToDraw = applyObjects(map, objects);
    for (let i = 0; i < idArray.length; i++) {
        for (let j = 0; j < idArray[i].length; j++) {
            let span = document.getElementById(idArray[i][j]);
            span.innerText = mapToDraw[i][j].char;
            span.className = mapToDraw[i][j].color;
        }
    }
}

function insertDivsSpans (windowId: string, rows: number, cols: number): any[] {
    let idArray: any[] = [];
    for (let i = 0; i < rows; i++) {
        idArray[i] = [];
        let div = document.createElement('div');
        for (let j = 0; j < cols; j++) {
            idArray[i][j] = 'row' + String(i) + 'col' + String(j);
            let span = document.createElement('span');
            span.setAttribute('id', idArray[i][j]);
            div.appendChild(span);
        }
        document.getElementById(windowId).appendChild(div);
    }
    return idArray;
}