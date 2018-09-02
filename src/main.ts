const WHITE: string = 'white';
const RED: string = 'red';
const BLUE: string = 'blue';
const GREEN: string = 'green';
const YELLOW: string = 'yellow';
const ORANGE: string = 'orange';
const PURPLE: string = 'purple';

class MapChar {
    public char: string;
    public color: string;

    constructor (char: string, color: string = '') {
        this.char = char;
        this.color = color;
    }
}

window.onload = function () {
    const WINDOW_ID: string = 'game_window';
    const COLUMNS: number = 99;
    const ROWS: number = 26;
    const bgChar: string = '-';
    const heroChar: string = '@';
    let objects: MapChar[] = [new MapChar(heroChar, GREEN)];
    let objectCoords: number[] = [0,0];

    /* make one div per line */
    let idArray: any[] = addDivRows(WINDOW_ID, ROWS, COLUMNS);
    const map: any[] = makeMap(COLUMNS, ROWS, bgChar);
    draw(idArray, map, objects, objectCoords);

    document.addEventListener('keydown', function keyHandler (event: any) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
    
        switch (event.which) {
        case 40: // down arrow
        case 74: // j
        case 83: // s
            if (objectCoords[0] < ROWS - 1) {
                objectCoords[0]++;
            }
            draw(idArray, map, objects, objectCoords);
            break;
        case 38: // up arrow
        case 75: // k
        case 87: // w
            if (objectCoords[0] > 0) {
                objectCoords[0]--;
            }
            draw(idArray, map, objects, objectCoords);
            break;
        case 37: // left arrow
        case 72: // h
        case 65: // a
            if (objectCoords[1] > 0) {
                objectCoords[1]--;
            }
            draw(idArray, map, objects, objectCoords);
            break;
        case 39: // right arrow
        case 76: // l
        case 68: // d
            if (objectCoords[1] < COLUMNS - 1) {
                objectCoords[1]++;
            }
            draw(idArray, map, objects, objectCoords);
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
            array[i][j] = new MapChar(bgChar);
        }
    }
    return array;
}

function applyObjects (map: any[], objects: MapChar[], objectCoords: number[]): any[] {
    // copy 2d array
    let newMap: any[] = [];
    for (let i = 0; i < map.length; i++) {
        newMap[i] = map[i].slice();
    }
    // insert objects
    for (let i = 0; i < objects.length; i++) {
        newMap[objectCoords[i*2]][objectCoords[i*2+1]] = objects[i];
    }
    return newMap;
}

function draw (idArray: any[], map: any[], objects: MapChar[], objectCoords: number[]): void {
    let mapToDraw = applyObjects(map, objects, objectCoords);
    for (let i = 0; i < idArray.length; i++) {
        for (let j = 0; j < idArray[i].length; j++) {
            let span = document.getElementById(idArray[i][j]);
            span.innerText = mapToDraw[i][j].char;
            span.className = mapToDraw[i][j].color;
        }
    }
}

function addDivRows (windowId: string, rows: number, cols: number): any[] {
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
