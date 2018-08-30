class MapChar {
    public char: string;
    public color: string;

    constructor (char: string, color: string = 'default') {
        this.char = char;
        this.color = color;
    }
}

class Coord {
    public x: number;
    public y: number;

    constructor (x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
class MapObject {
    public mapChar: MapChar;
    public coord: Coord;

    constructor (mapChar: MapChar, coord: Coord) {
        this.mapChar = mapChar;
        this.coord = coord;
    }
}

class Window {
    public coord: Coord;
    public width: number;
    public height: number;

    constructor (coord: Coord, width: number, height: number) {
        this.coord = coord;
        this.width = width;
        this.height = height;
    }
}

export { MapChar, Coord, MapObject, Window };