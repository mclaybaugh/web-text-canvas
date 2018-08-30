# Web Text Game

A web game that uses a div tag as the canvas, and displays text
as its art assets.

## Developers

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

## TODO

I am currently working on migrating some my the object oriented pieces
to a more functional style.

1. Game loop and basic movement controls
2. Color output with spans and classes
3. Animations on background
4. Additional implementation in Rust/WebAssembly
