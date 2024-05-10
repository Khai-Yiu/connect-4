function createBorder(cellWidth: number): string {
    return `|${'-'.repeat(cellWidth + 2)}|`;
}

function defaultResolver<T>(value: T) {
    if (value === null || value === undefined) {
        return '';
    }

    return `${value}`;
}

function toAsciiTable<T>(
    grid: Array<Array<T>>,
    cellResolver: (value: any) => string = defaultResolver
): string {
    if (grid.length === 0) {
        return '';
    }

    let cellWidth = 0;
    const tableRows = grid.reduce((tableRows, row) => {
        tableRows.push(
            row.reduce((rowContent, currentElement) => {
                const resolvedElement = cellResolver(currentElement);
                cellWidth =
                    resolvedElement.length > cellWidth
                        ? resolvedElement.length
                        : cellWidth;

                return rowContent.concat(`| ${resolvedElement} |`);
            }, '')
        );

        return tableRows;
    }, [] as Array<string>);

    const border = createBorder(cellWidth);
    return ['', border, tableRows[0], border].join('\n');
}

export default toAsciiTable;
