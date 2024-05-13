function createBorder(largestCharacterWidthPerColumn: Array<number>): string {
    return largestCharacterWidthPerColumn.reduce(
        (border, currentWidth) => border + `${'-'.repeat(currentWidth + 2)}|`,
        '|'
    );
}

const defaultResolver = <T>(value: T): string =>
    value === null || value === undefined ? '' : `${value}`;

function getLargestCharacterWidthPerColumn<T>(
    grid: Array<Array<T>>,
    cellResolver: (value: any) => string
) {
    return grid.reduce((maxColumnWidths, currentRow) => {
        currentRow.forEach((currentElement, columnIndex) => {
            const resolvedElement = cellResolver(currentElement);
            if (resolvedElement.length > maxColumnWidths[columnIndex]) {
                maxColumnWidths[columnIndex] = resolvedElement.length;
            }
        });

        return [...maxColumnWidths];
    }, Array(grid[0].length).fill(0));
}

function toAsciiTable<T>(
    grid: Array<Array<T>>,
    cellResolver: (value: any) => string = defaultResolver
): string {
    if (grid.length === 0) {
        return '';
    }

    const tableRows = grid.reduce((tableRows, currentRow) => {
        tableRows.push(
            currentRow.reduce((rowContent, currentElement) => {
                return rowContent.concat(` ${cellResolver(currentElement)} |`);
            }, '|')
        );
        console.log(tableRows);
        return tableRows;
    }, [] as Array<String>);

    const border = createBorder(
        getLargestCharacterWidthPerColumn(grid, cellResolver)
    );
    return ['', border, tableRows[0], border].join('\n');
}

export default toAsciiTable;
