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

1. ~~Perhaps migrate bulk of game logic to Rust and WebAssembly~~
    1. Moving to Rust has been postponed following multiple
       compilation errors encountered. These errors occurred when
       installing rust-generate, rust-bindgen, and the RLS.
       The error gave a message about the linker missing "lz"
2. Setup project to use TypeScript
3. Update Draw to integrate
    1. actors
    2. window
4. Setup game loop and basic movement controls
