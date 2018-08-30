import { MapChar } from './classes'

function FuncMap (rows: number, columns: number, bgChar: string): MapChar[] {
    let array: MapChar[] = [];
        for (let i: number = 0; i < (rows * columns); i++) {
            array[i] = new MapChar(bgChar);
        }
    return array;
}

export { FuncMap }