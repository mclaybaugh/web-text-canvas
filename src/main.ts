import { Manager } from './manager';

window.onload = function () {
    let windowId: string = 'game_window';
    let rows: number = 26;
    let columns: number = 99;
    let bgChar: string = '-';
    let heroChar: string = 'A';
    let heroColor: string = 'green';
    
    var manager = new Manager(windowId, 
        rows, columns, bgChar, 
        heroChar, heroColor);
};