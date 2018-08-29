function FuncMap (rows: number, columns: number, bgChar: string): any[] {
    let mapString: any[] = [];
        for (let i: number = 0; i < rows; i++) {
            mapString[i] = [];
            for (let j: number = 0; j < columns; j++) {
                mapString[i][j] = bgChar;
            }
        }
    return mapString;
}

export { FuncMap }