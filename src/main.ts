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
    const map: string[] = makeMap(COLUMNS, ROWS, bgChar);
    let objectChars: string[] = [heroChar];
    let objectCoords: number[] = [0,0];

    draw(WINDOW_ID, map, COLUMNS, objectChars, objectCoords);

    document.addEventListener('keydown', function keyHandler (event: any) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
    
        switch (event.which) {
        case 40: // down arrow
        case 74: // j
        case 83: // s
            if (objectCoords[1] < ROWS) {
                objectCoords[1]++;
            }
            draw(WINDOW_ID, map, COLUMNS, objectChars, objectCoords);
            break;
        case 38: // up arrow
        case 75: // k
        case 87: // w
            if (objectCoords[1] > 0) {
                objectCoords[1]--;
            }
            draw(WINDOW_ID, map, COLUMNS, objectChars, objectCoords);
            break;
        case 37: // left arrow
        case 72: // h
        case 65: // a
            if (objectCoords[0] > 0) {
                objectCoords[0]--;
            }
            draw(WINDOW_ID, map, COLUMNS, objectChars, objectCoords);
            break;
        case 39: // right arrow
        case 76: // l
        case 68: // d
            if (objectCoords[0] < COLUMNS) {
                objectCoords[0]++;
            }
            draw(WINDOW_ID, map, COLUMNS, objectChars, objectCoords);
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

/* Dependencies: None */
function makeMap (columns: number, rows: number, bgChar: string): string[] {
    let array: string[] = [];
        for (let i: number = 0; i < (rows * columns); i++) {
            array[i] = bgChar;
        }
    return array;
}

/* Dependencies: None */
function applyObjects (map: string[], cols: number,
    objectChars: string[], objectCoords: number[]): string[] {
    // for each game object, place objectChar into map at objectCoord
    let newMap: string[] = map.slice();
    for (let i = 0; i < objectChars.length; i++) {
        newMap[objectCoords[i*2] + objectCoords[i*2+1] * cols] = objectChars[i];
    }
    return newMap;
}

/* Dependencies: applyObjects */
function draw (windowId: string, map: string[], cols: number ,
    objectChars: string[], objectCoords: number[]): void {
    // contentString <- window <- objects <- map
    let gameWindow = document.getElementById(windowId);
    gameWindow.innerText = applyObjects(map, cols, objectChars, objectCoords)
    .reduce((acc: string, val: string) => {
        return acc + val;
    }, '');
}