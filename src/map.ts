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

class Sprite {
    public colorCharArray: any[];
    public coord: Coord;

    constructor (colorCharArray: any[], coord: Coord) {
        this.colorCharArray = colorCharArray;
        this.coord = coord;
    }
}

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

function applySprites (map: any[], sprites: Sprite[]): any[] {
    let newMap: any[] = [];
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

function draw (idArray: any[], map: any[], sprites: Sprite[]): void {
    let mapToDraw = applySprites(map, sprites);
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

export { ColorChar, Coord, Sprite, makeMap, draw, insertDivsSpans }