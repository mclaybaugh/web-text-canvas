const WHITE = 'white';
const RED = 'red';
const BLUE = 'blue';
const GREEN = 'green';
const YELLOW = 'yellow';
const ORANGE = 'orange';
const PURPLE = 'purple';

// Map
class Pixel {
  constructor (
    /** @type {string} */ char,
    /** @type {string} */ color = '',
    /** @type {string} */bgColor = '') {
    this.char = char;
    this.color = color;
    this.bgColor = bgColor;
  }
}

class Coord {
  constructor (
    /** @type {number} */ row = 0,
    /** @type {number} */ col = 0) {
    this.row = row;
    this.col = col;
  }
}

class Sprite {
  constructor (
    /** @type {array} */ pixels,
    /** @type {Coord} */ coord) {
    this.pixels = pixels;
    this.coord = coord;
  }
}

function makeMap (
  /** @type {number} */ cols,
  /** @type {number} */ rows,
  /** @type {string} */ defaultChar) {
  let array = [];
  for (let i = 0; i < rows; i++) {
    array[i] = [];
    for (let j = 0; j < cols; j++) {
      array[i][j] = new Pixel(defaultChar);
    }
  }
  return array;
}

function applySprites (
  /** @type {array} */ map,
  /** @type {array} */ sprites) {
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

function draw (
  /** @type {array} */ ids,
  /** @type {array} */ map,
  /** @type {array} */ sprites) {
  let mapToDraw = applySprites(map, sprites);
  for (let i = 0; i < ids.length; i++) {
    for (let j = 0; j < ids[i].length; j++) {
      let span = document.getElementById(ids[i][j]);
      span.innerText = mapToDraw[i][j].char;
      span.className = mapToDraw[i][j].color;
    }
  }
}

function insertDivsSpans (
  /** @type {string} */ windowId,
  /** @type {number} */ rows,
  /** @type {number} */ cols) {
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

function styleFullWindow (/** @type {string} */ windowId) {
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
  const fontSize = 10;
  gameWindow.style.fontSize = fontSize + 'pt';
  const rows = height / (fontSize + 7);
  const cols = width / (fontSize - 1) + 5;
  return {
    'rows': rows,
    'cols': cols
  };
}

// Sprites
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
// Progress bar
class progressBar {
  constructor (/** @type {number} */ size) {
    let pixels = [];
    for (let i = 0; i < size; i++) {
      pixels[i] = new Pixel('-');
    }
    this.sprite = new Sprite(
      pixels,
      new Coord(20, 20)
    );
    this.status = 0;
    this.size = size;
  }

  increment () {
    if (this.status == 99) {
      this.status = 0;
    } else {
      this.status++;
    }
    let pixels = [];
    for (let i = 0; i < this.size; i++) {

    }
  }
}

// My Menu
function MenuLink (
  /** @type {} */ text,
  /** @type {} */ url) {
  this.text = text;
  this.url = url;
}

const home = new MenuLink(
  'Home',
  '/'
);
const github = new MenuLink(
  'Check out my code on GitHub',
  'https://github.com/mclaybaugh'
);
const twitter = new MenuLink(
  'Follow me on Twitter',
  'https://twitter.com/michaelclaybaug'
);

// Main
window.onload = function () {
  const WINDOW_ID = 'game_window';
  const dimensions = styleFullWindow(WINDOW_ID);

  // nonblank space String.fromCharCode(160);
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