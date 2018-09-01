/*
 * outputing content as one string causes issue with wrap at end of line
 * 
 * Need to output as one div per line
*/

/* Colors are not used yet
const WHITE: string = 'white';
const RED: string = 'red';
const BLUE: string = 'blue';
const GREEN: string = 'green';
const YELLOW: string = 'yellow';
const ORANGE: string = 'orange';
const PURPLE: string = 'purple';
*/

window.onload = function () {
    const WINDOW_ID: string = 'game_window';
    const COLUMNS: number = 99;
    const ROWS: number = 26;
    const bgChar: string = '-';
    const heroChar: string = '@';
    let objectChars: string[] = [heroChar];
    let objectCoords: number[] = [0,0];

    /* make one div per line */
    let idArray: string[] = addDivRows(WINDOW_ID, ROWS);

    /* 1d */
    //const map: string[] = makeMap1d(COLUMNS, ROWS, bgChar);
    //draw1d(WINDOW_ID, map, COLUMNS, objectChars, objectCoords);

    /* 2d */
    const map: any[] = makeMap2d(COLUMNS, ROWS, bgChar);
    draw2dMultiDivs(idArray, map, objectChars, objectCoords);

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
            /* 1d */
            //draw1d(WINDOW_ID, map, COLUMNS, objectChars, objectCoords);
            /* 2d */
            draw2dMultiDivs(idArray, map, objectChars, objectCoords);
            break;
        case 38: // up arrow
        case 75: // k
        case 87: // w
            if (objectCoords[0] > 0) {
                objectCoords[0]--;
            }
            /* 1d */
            //draw1d(WINDOW_ID, map, COLUMNS, objectChars, objectCoords);
            /* 2d */
            draw2dMultiDivs(idArray, map, objectChars, objectCoords);
            break;
        case 37: // left arrow
        case 72: // h
        case 65: // a
            if (objectCoords[1] > 0) {
                objectCoords[1]--;
            }
            /* 1d */
            //draw1d(WINDOW_ID, map, COLUMNS, objectChars, objectCoords);
            /* 2d */
            draw2dMultiDivs(idArray, map, objectChars, objectCoords);
            break;
        case 39: // right arrow
        case 76: // l
        case 68: // d
            if (objectCoords[1] < COLUMNS - 1) {
                objectCoords[1]++;
            }
            /* 1d */
            //draw1d(WINDOW_ID, map, COLUMNS, objectChars, objectCoords);
            /* 2d */
            draw2dMultiDivs(idArray, map, objectChars, objectCoords);
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

function makeMap2d (cols: number, rows: number, bgChar: string): any[] {
    let array: any[] = [];
    for (let i = 0; i < rows; i++) {
        array[i] = [];
        for (let j = 0; j < cols; j++) {
            array[i][j] = bgChar;
        }
    }
    return array;
}

function makeMap1d (cols: number, rows: number, bgChar: string): string[] {
    let map: string[] = [];
    for (let i = 0; i < cols * rows; i++) {
        map[i] = bgChar;
    }
    return map;
}

function applyObjects2d (map: any[], objectChars: string[], objectCoords: number[]): any[] {
    // copy 2d array
    let newMap: any[] = [];
    for (let i = 0; i < map.length; i++) {
        newMap[i] = map[i].slice();
    }

    // insert objects
    for (let i = 0; i < objectChars.length; i++) {
        newMap[objectCoords[i*2]][objectCoords[i*2+1]] = objectChars[i];
    }
    return newMap;
}

function applyObjects1d (map: string[], cols: number, objectChars: string[], objectCoords: number[]): string[] {
    let newMap = map.slice();

    for (let i = 0; i < objectChars.length; i++) {
        newMap[objectCoords[i*2] * cols + objectCoords[i*2+1]] = objectChars[i];
    }
    return newMap;
}

function addDivRows (windowId: string, rows: number): string[] {
    let idArray: string[] = [];
    let gameWindow = document.getElementById(windowId);
    for (let i = 0; i < rows; i++) {
        idArray[i] = 'row' + String(i);
        let div = document.createElement('div');
        div.setAttribute('id', idArray[i]);
        gameWindow.appendChild(div);
    }
    return idArray;
}

function draw2dMultiDivs (idArray: string[], map: any[], objectChars: string[], objectCoords: number[]): void {
    // contentString <- window <- objects <- map
    let mapToDraw = applyObjects2d(map, objectChars, objectCoords);

    for (let i = 0; i < idArray.length; i++) {
        let div = document.getElementById(idArray[i]);
        div.innerText = mapToDraw[i].reduce(
            (acc: string, val: string) => {
                return acc + val;
            }, '');
    }
}

function draw1d (windowId: string, map: string[], cols: number, objectChars: string[], objectCoords: number[]): void {
    let gameWindow = document.getElementById(windowId);
    gameWindow.innerText = applyObjects1d(map, cols, objectChars, objectCoords).reduce(
        (acc: string, val: string) => {
            return acc + val;
        }, '');
}