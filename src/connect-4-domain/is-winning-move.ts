import { Board, BoardCell, PlayerMove } from '@/connect-4-domain/game';

type WinState = {
    consecutiveDiscs: number;
    isWinning: boolean;
};

function isRowOrColumnAWin(
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

    return isRowOrColumnAWin(columnToCheck, player);
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

    return isRowOrColumnAWin(rowToCheck, player);
}

function isWinningMove(
    board: Board,
    playerMove: PlayerMove
): {
    isWin: boolean;
} {
    const isWin =
        isVerticalWin(board, playerMove) || isHorizontalWin(board, playerMove);

    return {
        isWin: isWin
    };
}

export default isWinningMove;
