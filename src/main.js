const WHITE = 'white';
const RED = 'red';
const BLUE = 'blue';
const GREEN = 'green';
const YELLOW = 'yellow';
const ORANGE = 'orange';
const PURPLE = 'purple';

/* Map */
function ColorChar (char, color) {
    if (typeof color === 'undefined') color = '';
    this.char = char;
    this.color = color;
}

function Coord (row, col) {
    if (typeof row === 'undefined') row = 0;
    if (typeof col === 'undefined') col = 0;
    this.row = row;
    this.col = col;
}

function Sprite (colorCharArray, coord) {
    this.colorCharArray = colorCharArray;
    this.coord = coord;
}

function makeMap (cols, rows, bgChar) {
    let array = [];
    for (let i = 0; i < rows; i++) {
        array[i] = [];
        for (let j = 0; j < cols; j++) {
            array[i][j] = new ColorChar(bgChar);
        }
    }
    return array;
}

function applySprites (map, sprites) {
    let newMap = [];
    for (let i = 0; i < map.length; i++) {
        newMap[i] = map[i].slice();
    }

    for (let i = 0; i < sprites.length; i++) {
        for (let j = 0; j < sprites[i].colorCharArray.length; j++) {
            for (let k = 0; k < sprites[i].colorCharArray[j].length; k++) {
                if (sprites[i].colorCharArray[j][k] !== ''
                    && (sprites[i].coord.row + j) < newMap.length) {
                    newMap[sprites[i].coord.row + j][sprites[i].coord.col + k] = sprites[i].colorCharArray[j][k];
                }
            }
        }
    }
    return newMap;
}

function draw (idArray, map, sprites) {
    let mapToDraw = applySprites(map, sprites);
    for (let i = 0; i < idArray.length; i++) {
        for (let j = 0; j < idArray[i].length; j++) {
            let span = document.getElementById(idArray[i][j]);
            span.innerText = mapToDraw[i][j].char;
            span.className = mapToDraw[i][j].color;
        }
    }
}

function insertDivsSpans (windowId, rows, cols) {
    let idArray = [];
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

/* Main */
window.onload = function () {
    const WINDOW_ID = 'game_window';
    const ROWS = 26;
    const COLS = 99;


    const bgChar = String.fromCharCode(160);
    const heroArray = [[
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

    let sprites = [new Sprite(
        heroArray,
        new Coord()
    )];

    let idArray = insertDivsSpans(WINDOW_ID, ROWS, COLS);
    const map = makeMap(COLS, ROWS, bgChar);
    draw(idArray, map, sprites);

    document.addEventListener('keydown', function keyHandler (event) {
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