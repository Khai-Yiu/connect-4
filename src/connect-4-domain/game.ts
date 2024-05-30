import deepClone from '@/connect-4-domain/deep-clone';
import { MovePlayerCommand } from '@/connect-4-domain/commands';
import {
    createPlayerMoveFailedEvent,
    PlayerMoveFailedEvent
} from '@/connect-4-domain/events';

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

type PlayerMoveFailedEvent = {
    type: string;
};

interface Game {
    getBoard: () => Board;
}

export class InvalidBoardDimensionsError extends RangeError {}

class GameFactory implements Game {
    private board: Board;
    private players: Record<PlayerNumber, PlayerStats>;
    private activePlayer: PlayerNumber;

    constructor(
        { boardDimensions }: GameParameters = {
            boardDimensions: { rows: 6, columns: 7 }
        }
    ) {
        this.validateBoardDimensions(boardDimensions);
        this.board = this.createBoard(boardDimensions);
        this.players = this.createPlayers(boardDimensions);
        this.activePlayer = 1;
    }

    getBoard = () => {
        return deepClone(this.board);
    };

    getPlayerStats = (playerNumber: 1 | 2): PlayerStats => {
        return this.players[playerNumber];
    };

    getActivePlayer = (): PlayerNumber => this.activePlayer;

    move({
        payload: {
            targetCell: { row, column }
        }
    }: MovePlayerCommand): PlayerMoveFailedEvent {
        if (
            (row < 0 || row > this.board.length) &&
            (column < 0 || column > this.board[0].length)
        ) {
            return createPlayerMoveFailedEvent({
                message: `Cell at row ${row} and column ${column} doesn't exist on the board. The row number must be >= 0 and <= ${this.board.length - 1} and the column number must be >= 0 and <= ${this.board[0].length - 1}`
            });
        } else if (row < 0 || row > this.board.length - 1) {
            return createPlayerMoveFailedEvent({
                message: `Cell at row ${row} and column ${column} doesn't exist on the board. The row number must be >= 0 and <= ${this.board.length - 1}`
            });
        } else if (column < 0 || column > this.board[0].length - 1) {
            return createPlayerMoveFailedEvent({
                message: `Cell at row ${row} and column ${column} doesn't exist on the board. The column number must be >= 0 and <= ${this.board[0].length - 1}`
            });
        }
    }

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

    private validateBoardDimensions({ rows, columns }: BoardDimensions) {
        if (rows < 1 || columns < 1) {
            throw new InvalidBoardDimensionsError(
                'Number of rows must be greater than or equal to 1'
            );
        } else if ((rows * columns) % 2 === 1) {
            throw new InvalidBoardDimensionsError(
                `The total number of cells on a board must be even. The supplied board dimensions ${rows} x ${columns} result in an odd number of cells`
            );
        }
    }
}

export default GameFactory;
