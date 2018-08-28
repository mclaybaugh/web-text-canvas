class GameField {
    constructor (inHero, inChar, inWidth, inHeight) {
        this.hero = inHero
        this.bg_char = inChar
        this.width = inWidth
        this.height = inHeight
        this.content = initArray(this.height, this.width, this.bg_char)
    }

    get content_string () {
        /*var content = '';
        for (var i in this.content) {
            for (var j in this.content[i]) {
                content += this.content[i][j];
            }
        }
        return content;*/
        return this.content.reduce((content, val) => { console.log(val); return content + val})
    }
}
export { GameField }

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