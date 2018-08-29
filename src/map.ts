class Map {
    bg_char: string;
    width: number;
    height: number;
    content: any[];
    constructor (char: string, width: number, height: number) {
        this.bg_char = char;
        this.width = width;
        this.height = height;
        this.content = initArray(this.height, this.width, this.bg_char);
    }

    get contentString () {
        var content = '';
        for (var i in this.content) {
            for (var j in this.content[i]) {
                content += this.content[i][j];
            }
        }
        return content;
    }
}

class MapChar {
    char: string;
    color: string;
    constructor (char: string, color: string) {
        this.char = char;
        this.color = color;
    }
}

class Coord {
    x: number;
    y: number;
    constructor (x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
class Actor {
    mapChar: MapChar;
    coord: Coord;
    constructor (mapChar: MapChar, coord: Coord) {
        this.mapChar = mapChar;
        this.coord = coord;
    }
}

class Window {
    coord: Coord;
    width: number;
    height: number;
    constructor (coord: Coord, width: number, height: number) {
        this.coord = coord;
        this.width = width;
        this.height = height;
    }
}

export { Map, MapChar, Coord, Actor, Window };

function initArray(height: number, width: number, inChar: any): any[] {
    var newArray = [];
    for (var i = 0; i < height; i++) {
        newArray[i] = [];
        for (var j = 0; j < width; j++) {
            newArray[i][j] = inChar;
        }
    }
    return newArray;
}