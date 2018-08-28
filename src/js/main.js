import { GameField } from './map'

// 26 rows, 99 columns
var main_screen = new GameField('A', '-', 26, 99)

function draw_window () {
    document.getElementById('game-window').innerText = main_screen.content_string
}

document.addEventListener('keydown', function (event) {
    if (event.defaultPrevented) {
        return // Do nothing if the event was already processed
    }
    switch (event.which) {
    case 40: // down arrow
    case 74: // j
        move_down()
        break
    case 38: // up arrow
    case 75: // k
        move_up()
        break
    case 37: // left arrow
    case 72: // h
        move_left()
        break
    case 39: // right arrow
    case 76: // l
        move_right()
        break
    default:
        return // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault()
}, true)

function move_right () {
    draw_window()
}
function move_left () {
    draw_window()
}
function move_up () {
    draw_window()
}
function move_down () {
    draw_window()
}