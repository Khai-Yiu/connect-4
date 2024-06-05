import { Board, BoardCell, PlayerMove } from '@/connect-4-domain/game';

type WinState = {
    consecutiveDiscs: number;
    isWinning: boolean;
};

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
    columnToCheck[row] = { player: 1 };

    const { isWinning } = columnToCheck.reduce(
        (state: WinState, currentCell: BoardCell): WinState => {
            if (state.isWinning) {
                return state;
            }

            if (currentCell.player === player) {
                if (state.consecutiveDiscs === 3) {
                    return {
                        consecutiveDiscs: state.consecutiveDiscs + 1,
                        isWinning: true
                    };
                }

                return {
                    ...state,
                    consecutiveDiscs: state.consecutiveDiscs + 1
                };
            }

            return {
                ...state,
                consecutiveDiscs: 0
            };
        },
        {
            consecutiveDiscs: 0,
            isWinning: false
        }
    );

    return isWinning;
}

function isWinningMove(
    board: Board,
    playerMove: PlayerMove
): {
    isWin: boolean;
} {
    const isWin = isVerticalWin(board, playerMove);
    return {
        isWin: isWin
    };
}

export default isWinningMove;
