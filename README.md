# Web Text Game

A web game that uses a div tag as the canvas, and displays text
as its art assets.

## Developers

Javascript is processed by browserify and babel to enable the usage
of es6 and modules, then minified. CSS is process by sass, then minified.

Use npm to set up project and gulp to run tasks.

```bash
# install dev dependencies
npm install

# build project in dist/
gulp

# delete dist/ and all contents
gulp clean

# update build when files are saved
gulp watch
```

## TODO

1. Setup project to use TypeScript
2. Update Draw to integrate
    1. actors
    2. window
3. Setup game loop and basic movement controls
4. Perhaps migrate bulk of game logic to Rust and WebAssembly