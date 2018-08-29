class Map {
    bg_char: any;
    width: any;
    height: any;
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
    char: any;
    color: any;
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
    MapChar: any;
    coord: any;
    constructor (mapChar: MapChar, coord: Coord) {
        this.MapChar = mapChar;
        this.coord = coord;
    }
}

class Window {
    coord: any;
    width: any;
    height: any;
    constructor (coord: Coord, width: number, height: number) {
        this.coord = coord;
        this.width = width;
        this.height = height;
    }
}

export { Map, MapChar, Coord, Actor, Window };

function initArray(inHeight: any, inWidth: any, inChar: any): any[] {
    var newArray = [];
    for (var i = 0; i < inHeight; i++) {
        newArray[i] = [];
        for (var j = 0; j < inWidth; j++) {
            newArray[i][j] = inChar;
        }
    }
    return newArray;
}