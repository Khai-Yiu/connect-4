import { BoardCellProps } from '@/connect-4-ui/BoardCell';

const createCells = (
    rows: number = 0,
    columns: number = 0,
    selectionStrategy: () => 1 | 2 | undefined = () => undefined
): Array<Array<BoardCellProps>> => {
    const cells: Array<Array<BoardCellProps>> = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        cells[rowIndex] = [];
        for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
            cells[rowIndex][columnIndex] = {
                player: selectionStrategy(),
                uuid: crypto.randomUUID()
            };
        }
    }

    return cells;
};

export default createCells;
