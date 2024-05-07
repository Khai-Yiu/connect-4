function createBorder(cellWidth: number): string {
    return `|${'-'.repeat(cellWidth + 2)}|`;
}

function toAsciiTable(grid: Array<Array<string>>): string {
    if (grid.length === 0) {
        return '';
    }

    const tableRows = grid.reduce((tableRows, row) => {
        tableRows.push(
            row.reduce((rowContent, element) => {
                return rowContent.concat(`| ${element} |`);
            }, '')
        );

        return tableRows;
    }, []);

    const border = createBorder(grid[0][0].length);
    return ['', border, tableRows[0], border].join('\n');
}

export default toAsciiTable;
