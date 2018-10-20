const WHITE = 'white';
const RED = 'red';
const BLUE = 'blue';
const GREEN = 'green';
const YELLOW = 'yellow';
const ORANGE = 'orange';
const PURPLE = 'purple';

/* Map */
function Pixel (char, color, bgColor) {
    if (typeof color === 'undefined') color = '';
    if (typeof bgColor === 'undefined') bgColor = '';
    this.char = char;
    this.color = color;
    this.bgColor = bgColor;
}

function Coord (row, col) {
    if (typeof row === 'undefined') row = 0;
    if (typeof col === 'undefined') col = 0;
    this.row = row;
    this.col = col;
}

function Sprite (pixels, coord) {
    this.pixels = pixels;
    this.coord = coord;
}

function makeMap (cols, rows, defaultChar) {
    let array = [];
    for (let i = 0; i < rows; i++) {
        array[i] = [];
        for (let j = 0; j < cols; j++) {
            array[i][j] = new Pixel(defaultChar);
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
        for (let j = 0; j < sprites[i].pixels.length; j++) {
            for (let k = 0; k < sprites[i].pixels[j].length; k++) {
                if (sprites[i].pixels[j][k] !== ''
                    && (sprites[i].coord.row + j) < newMap.length) {
                    let row = sprites[i].coord.row + j;
                    let col = sprites[i].coord.col + k;
                    newMap[row][col] = sprites[i].pixels[j][k];
                }
            }
        }
    }
    return newMap;
}

function draw (ids, map, sprites) {
    let mapToDraw = applySprites(map, sprites);
    for (let i = 0; i < ids.length; i++) {
        for (let j = 0; j < ids[i].length; j++) {
            let span = document.getElementById(ids[i][j]);
            span.innerText = mapToDraw[i][j].char;
            span.className = mapToDraw[i][j].color;
        }
    }
}

function insertDivsSpans (windowId, rows, cols) {
    let ids = [];
    for (let i = 0; i < rows; i++) {
        ids[i] = [];
        let div = document.createElement('div');
        for (let j = 0; j < cols; j++) {
            ids[i][j] = 'row' + String(i) + 'col' + String(j);
            let span = document.createElement('span');
            span.setAttribute('id', ids[i][j]);
            div.appendChild(span);
        }
        document.getElementById(windowId).appendChild(div);
    }
    return ids;
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
    const fontSize = 14;
    gameWindow.style.fontSize = fontSize + 'pt';
    const rows = height / (fontSize + 9);
    const cols = width / (fontSize - 2) + 5;
    return {
        'rows': rows,
        'cols': cols
    };
}

function getHero () {
    return [[
        new Pixel('@', RED),
        new Pixel('@', WHITE),
        new Pixel('@', BLUE)
    ],[
        new Pixel('@', GREEN),
        '',
        new Pixel('@', YELLOW),
    ],[
        new Pixel('@', ORANGE),
        new Pixel('@', PURPLE),
        new Pixel('@', RED)
    ]];
}
/* Main */
window.onload = function () {
    const WINDOW_ID = 'game_window';
    const dimensions = styleGameWindow(WINDOW_ID);

    const defaultChar = '-';
    const heroArray = getHero();

    let sprites = [new Sprite(
        heroArray,
        new Coord()
    )];

    let ids = insertDivsSpans(WINDOW_ID, dimensions.rows, dimensions.cols);
    const map = makeMap(dimensions.cols, dimensions.rows, defaultChar);
    draw(ids, map, sprites);

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
            draw(ids, map, sprites);
            break;
        case 38: // up arrow
        case 75: // k
        case 87: // w
            if (sprites[0].coord.row > 0) {
                sprites[0].coord.row--;
            }
            draw(ids, map, sprites);
            break;
        case 37: // left arrow
        case 72: // h
        case 65: // a
            if (sprites[0].coord.col > 0) {
                sprites[0].coord.col--;
            }
            draw(ids, map, sprites);
            break;
        case 39: // right arrow
        case 76: // l
        case 68: // d
            if (sprites[0].coord.col < dimensions.cols - 1) {
                sprites[0].coord.col++;
            }
            draw(ids, map, sprites);
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