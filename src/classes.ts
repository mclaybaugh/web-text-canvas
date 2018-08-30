class MapChar {
    public char: string;
    public color: string;

    constructor (char: string, color: string = 'default') {
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