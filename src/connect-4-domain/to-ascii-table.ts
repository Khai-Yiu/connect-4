function createBorder(cellWidth: number): string {
    return `|${'-'.repeat(cellWidth + 2)}|`;
}

function toAsciiTable(grid: Array<Array<string | undefined>>): string {
    if (grid.length === 0) {
        return '';
    }

    const tableRows = grid.reduce((tableRows, row) => {
        tableRows.push(
            row.reduce((rowContent: string, element) => {
                return element !== undefined
                    ? rowContent.concat(`| ${element} |`)
                    : '|  |';
            }, '')
        );

        return tableRows;
    }, []);

    const border = createBorder(
        grid[0][0] !== undefined ? grid[0][0].length : 0
    );
    return ['', border, tableRows[0], border].join('\n');
}

export default toAsciiTable;
