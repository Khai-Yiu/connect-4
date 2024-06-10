import { Board, BoardCell, PlayerMove } from '@/connect-4-domain/game';

type WinState = {
    consecutiveDiscs: number;
    isWinning: boolean;
};

function isConsecutiveWin(
    cellArray: Array<BoardCell>,
    player: 1 | 2 | undefined
): boolean {
    const { isWinning } = cellArray.reduce(
        (state: WinState, currentCell: BoardCell): WinState => {
            const { consecutiveDiscs, isWinning } = state;

            return currentCell.player === player
                ? {
                      consecutiveDiscs: consecutiveDiscs + 1,
                      isWinning: consecutiveDiscs + 1 >= 4
                  }
                : { consecutiveDiscs: 0, isWinning };
        },
        { consecutiveDiscs: 0, isWinning: false }
    );

    return isWinning;
}

function isTopLeftBottomRightDiagonalWin(
    board: Board,
    playerMove: PlayerMove
): boolean {
    if (board.length < 4 || board[0].length < 4) {
        return false;
    }

    const {
        player,
        targetCell: { row, column }
    } = playerMove;
    const offset = Math.min(row, column);
    let startRow = row - offset;
    let startColumn = column - offset;

    const diagonalToCheck = [];
    while (startRow < board.length && startColumn < board[0].length) {
        if (startRow === row && startColumn === column) {
            diagonalToCheck.push({ player: player });
        } else {
            diagonalToCheck.push(board[startRow][startColumn]);
        }

        startRow++;
        startColumn++;
    }

    return isConsecutiveWin(diagonalToCheck, player);
}

function isVerticalWin(board: Board, playerMove: PlayerMove): boolean {
    if (board.length < 4) {
        return false;
    }

    const {
        player,
        targetCell: { row, column }
    } = playerMove;
    const columnToCheck = board.map(
        (row: Array<BoardCell>): BoardCell => row[column]
    );
    columnToCheck[row] = { player: player };

    return isConsecutiveWin(columnToCheck, player);
}

function isHorizontalWin(board: Board, playerMove: PlayerMove): boolean {
    if (board[0].length < 4) {
        return false;
    }

    const {
        player,
        targetCell: { row, column }
    } = playerMove;
    const rowToCheck = [...board[row]];
    rowToCheck[column] = { player: player };

    return isConsecutiveWin(rowToCheck, player);
}

function isWinningMove(
    board: Board,
    playerMove: PlayerMove
): {
    isWin: boolean;
} {
    const isWin =
        isVerticalWin(board, playerMove) ||
        isHorizontalWin(board, playerMove) ||
        isTopLeftBottomRightDiagonalWin(board, playerMove);

    return {
        isWin: isWin
    };
}

export default isWinningMove;
