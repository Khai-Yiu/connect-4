import { BoardCellProps } from '@/BoardCell';

const checkForWin = (
    cells: Array<Array<BoardCellProps>>,
    updatedRowIndex: number,
    updatedColumnIndex: number,
    player: 1 | 2
): boolean => {
    return (
        checkRowForWin(cells, updatedRowIndex, player) ||
        checkColumnForWin(cells, updatedColumnIndex, player) ||
        checkDiagonalForWin(cells, updatedRowIndex, updatedColumnIndex, player)
    );
};

const checkRowForWin = (
    cells: Array<Array<BoardCellProps>>,
    updatedRowIndex: number,
    player: 1 | 2
): boolean => {
    const rowToCheck = cells[updatedRowIndex];
    let sameTokensInARow = 0;

    for (let columnIndex = 0; columnIndex < rowToCheck.length; columnIndex++) {
        if (rowToCheck[columnIndex].player === player) {
            sameTokensInARow++;

            if (sameTokensInARow === 4) {
                return true;
            }
        } else {
            sameTokensInARow = 0;
        }
    }

    return false;
};

const checkColumnForWin = (
    cells: Array<Array<BoardCellProps>>,
    updatedColumnIndex: number,
    player: 1 | 2
): boolean => {
    const numberOfRows = cells.length;
    let sameTokensInAColumn = 0;

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        if (cells[rowIndex][updatedColumnIndex].player === player) {
            sameTokensInAColumn++;

            if (sameTokensInAColumn === 4) {
                return true;
            }
        } else {
            sameTokensInAColumn = 0;
        }
    }

    return false;
};

const checkDiagonalForWin = (
    cells: Array<Array<BoardCellProps>>,
    updatedRowIndex: number,
    updatedColumnIndex: number,
    player: 1 | 2
): boolean => {
    const numberOfRows = cells.length;
    const numberOfColumns = cells[0].length;
    let currRowIndex = updatedRowIndex;
    let currColumnIndex = updatedColumnIndex;
    let sameTokensInARow = 0;

    while (currRowIndex > 0 && currColumnIndex > 0) {
        currRowIndex--;
        currColumnIndex--;
    }

    while (currRowIndex < numberOfRows && currColumnIndex < numberOfColumns) {
        if (cells[currRowIndex][currColumnIndex].player === player) {
            sameTokensInARow++;

            if (sameTokensInARow === 4) {
                return true;
            }
        } else {
            sameTokensInARow = 0;
        }

        currRowIndex++;
        currColumnIndex++;
    }

    currRowIndex = updatedRowIndex;
    currColumnIndex = updatedColumnIndex;
    sameTokensInARow = 0;

    while (currRowIndex > 0 && currColumnIndex < numberOfColumns - 1) {
        currRowIndex--;
        currColumnIndex++;
    }

    while (currRowIndex < numberOfRows && currColumnIndex > 0) {
        if (cells[currRowIndex][currColumnIndex].player === player) {
            sameTokensInARow++;

            if (sameTokensInARow === 4) {
                return true;
            }
        } else {
            sameTokensInARow = 0;
        }

        currRowIndex++;
        currColumnIndex--;
    }

    return false;
};

export default checkForWin;
