# Web Text Game

A web game that uses a div tag as the canvas, and displays text
as its sprites.

## Why did I use [thing]?

1. Typescript

    For documenting types in the code itself instead of in
    comments. This project would be more at home
    in a static-typed systems programming language, which
    is why I am excited to port this to Rust/WebAssembly.

2. Babel

    Mostly for ```const```, ```let``` and arrow functions.

3. Gulp

    Because it was better than Grunt and I haven't had the chance
    to try it with Webpack yet.

## Development Values

1. Do not introduce abstractions until they are needed.
2. Use pure functions as much as possible.

## TODO

1. Game loop with background movement/animations
2. Color output with spans and classes
3. Additional implementation in Rust/WebAssembly

## Development workflow

Use npm to set up project and gulp to run tasks.

```bash
# install dev dependencies
npm install

# build project in dist/
gulp

# delete dist/ and all contents
gulp clean

# uglify javascript, for deploying
gulp build
```
