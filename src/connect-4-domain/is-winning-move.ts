import { Board, BoardCell, PlayerMove } from '@/connect-4-domain/game';

type WinState = {
    consecutiveDiscs: number;
    isWinning: boolean;
};

function isVerticalWin(board: Board, playerMove: PlayerMove): boolean {
    const {
        player,
        targetCell: { column }
    } = playerMove;
    const { isWinning } = board.reduce(
        (state: WinState, currentRow: Array<BoardCell>): WinState => {
            if (state.isWinning) {
                return state;
            }

            if (currentRow[column].player === player) {
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
    const {
        player,
        targetCell: { row, column }
    } = playerMove;
    board[row][column].player = player;
    const isWin = isVerticalWin(board, playerMove);
    return {
        isWin: isWin
    };
}

export default isWinningMove;
