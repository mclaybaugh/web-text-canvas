class Map {
    constructor (char, width, height) {
        this.bg_char = char
        this.width = width
        this.height = height
        this.content = initArray(this.height, this.width, this.bg_char)
    }

    get content_string () {
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
    constructor (char, color) {
        this.char = char
        this.color = color
    }
}

class Coord {
    constructor (x = 0, y = 0) {
        this.x = x
        this.y = y
    }
}
class Actor {
    constructor (mapChar, coord) {
        this.MapChar = mapChar
        this.coord = coord
    }
}

class Window {
    constructor (coord, width, height) {
        this.coord = coord
        this.width = width
        this.height = height
    }
}

export { Map, MapChar, Coord, Actor, Window }

function initArray(inHeight, inWidth, inChar) {
    var newArray = []
    for (var i = 0; i < inHeight; i++) {
        newArray[i] = []
        for (var j = 0; j < inWidth; j++) {
            newArray[i][j] = inChar
        }
    }
    return newArray
}