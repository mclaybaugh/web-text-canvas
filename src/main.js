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

function styleGameWindow (windowId) {
    const gameWindow = document.getElementById(windowId);
    const height = window.innerHeight;
    const width = window.innerWidth;
    gameWindow.style.height = height;
    gameWindow.style.width = width;
    gameWindow.style.margin = '0 auto';
    gameWindow.style.padding = '10px 0 0 20px';
    gameWindow.style.backgroundColor = 'rgb(43, 40, 40)';
    gameWindow.style.color = 'rgb(175, 169, 169)';
    gameWindow.style.fontFamily = 'Courier, monospace';
    const rows = height / 18 - 1;
    const cols = width / 10 + 3;
    return {
        'rows': rows,
        'cols': cols
    };
}

function getHero () {
    return [[
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
}
/* Main */
window.onload = function () {
    const WINDOW_ID = 'game_window';
    const dimensions = styleGameWindow(WINDOW_ID);

    const bgChar = '-';
    const heroArray = getHero();

    let sprites = [new Sprite(
        heroArray,
        new Coord()
    )];

    let idArray = insertDivsSpans(WINDOW_ID, dimensions.rows, dimensions.cols);
    const map = makeMap(dimensions.cols, dimensions.rows, bgChar);
    draw(idArray, map, sprites);

    document.addEventListener('keydown', function keyHandler (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.which) {
        case 40: // down arrow
        case 74: // j
        case 83: // s
            if (sprites[0].coord.row < dimensions.rows - 1) {
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
            if (sprites[0].coord.col < dimensions.cols - 1) {
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