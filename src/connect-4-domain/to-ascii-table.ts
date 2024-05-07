function toAsciiTable<T>(grid: Array<Array<T>>): string {
    if (grid.length === 0) {
        return '';
    }

    const columns = grid[0].length;
    const border = new Array(columns).fill('|---|').join();
    const table = grid.reduce((table, row) => {
        const rowContent = row.reduce((rowContent, element) => {
            return rowContent.concat(`| ${element} |`);
        }, '');

        return table.concat('\n', rowContent, '\n', border);
    }, '\n' + border);

    return table + '\n';
}

export default toAsciiTable;
