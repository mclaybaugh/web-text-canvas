# Web Text Game

A web game that uses a div tag as the canvas, and displays text
as its art assets.

## Developers

Javascript is processed by browserify and babel to enable the usage
es6 and modules, then minified. CSS is process by sass, then minified.

Use npm to set up project and gulp to run tasks.

1. Install dev dependencies:
    ```bash
    npm install
    ```
2. Build
    ```bash
    gulp
    ```
3. Update build while working
    ```bash
    gulp watch
    ```
4. Clean dist directory
    ```bash
    gulp clean
    ```