import deepClone from '@/connect-4-domain/deep-clone';

export type BoardCell = {
    player: 1 | 2 | undefined;
};

type Board = Array<Array<BoardCell>>;

type BoardDimensions = {
    rows: number;
    columns: number;
};

type PlayerNumber = 1 | 2;

type PlayerStats = {
    playerNumber: 1 | 2;
    remainingDiscs: number;
};

type GameParameters = {
    boardDimensions: { rows: number; columns: number };
};

interface Game {
    getBoard: () => Board;
}

export class InvalidBoardDimensionsError extends RangeError {}

class GameFactory implements Game {
    private board: Board;
    private players: Record<PlayerNumber, PlayerStats>;

    constructor(
        { boardDimensions }: GameParameters = {
            boardDimensions: { rows: 6, columns: 7 }
        }
    ) {
        if (boardDimensions.rows < 1) {
            throw new InvalidBoardDimensionsError(
                'Number of rows must be greater than or equal to 1'
            );
        }

        this.board = this.createBoard(boardDimensions);
        this.players = this.createPlayers(boardDimensions);
    }

    getBoard = () => {
        return deepClone(this.board);
    };

    getPlayerStats = (playerNumber: 1 | 2): PlayerStats => {
        return this.players[playerNumber];
    };

    private createBoard({
        rows,
        columns
    }: BoardDimensions): Array<Array<BoardCell>> {
        return new Array(rows).fill(undefined).map(() =>
            new Array(columns).fill(undefined).map(() => ({
                player: undefined
            }))
        );
    }

    private createPlayers({
        rows,
        columns
    }: BoardDimensions): Record<PlayerNumber, PlayerStats> {
        const remainingDiscs = (rows * columns) / 2;
        return {
            1: {
                playerNumber: 1,
                remainingDiscs: remainingDiscs
            },
            2: {
                playerNumber: 2,
                remainingDiscs: remainingDiscs
            }
        };
    }
}

export default GameFactory;
