
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

class MapChar {
    private char: string;
    private color: string;

    constructor (char: string, color: string) {
        this.char = char;
        this.color = color;
    }
}

class Coord {
    private x: number;
    private y: number;

    constructor (x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
class Actor {
    private mapChar: MapChar;
    private coord: Coord;

    constructor (mapChar: MapChar, coord: Coord) {
        this.mapChar = mapChar;
        this.coord = coord;
    }
}

class Window {
    private coord: Coord;
    private width: number;
    private height: number;

    constructor (coord: Coord, width: number, height: number) {
        this.coord = coord;
        this.width = width;
        this.height = height;
    }
}

export { MapChar, Coord, Actor, Window };