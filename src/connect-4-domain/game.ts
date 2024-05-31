import deepClone from '@/connect-4-domain/deep-clone';
import { MovePlayerCommand } from '@/connect-4-domain/commands';
import {
    createPlayerMoveFailedEvent,
    PlayerMoveFailedEvent,
    createPlayerMovedEvent,
    PlayerMovedEvent
} from '@/connect-4-domain/events';
import { BoardCell } from '@/connect-4-ui/BoardCell';

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

type ValidationResult = {
    isValid: boolean;
    message: string;
};

type ValidCellOnBoard = {
    isValidRow: boolean;
    isValidColumn: boolean;
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

    move = this.createValidatedMove(this._move.bind(this));

    private _move({
        payload: {
            player,
            targetCell: { row, column }
        }
    }: MovePlayerCommand): PlayerMovedEvent {
        this.board[row][column] = { player: player };
        this.activePlayer = this.activePlayer === 2 ? 1 : 2;
        return createPlayerMovedEvent({
            player,
            targetCell: { row, column }
        });
    }

    private createValidatedMove(
        moveFunction: (movePlayerCommand: MovePlayerCommand) => PlayerMovedEvent
    ): (
        movePlayerCommand: MovePlayerCommand
    ) => PlayerMoveFailedEvent | PlayerMovedEvent {
        return (
            movePlayerCommand: MovePlayerCommand
        ): PlayerMoveFailedEvent | PlayerMovedEvent => {
            const { isValid, message } = this.validateMove(movePlayerCommand);

            return isValid
                ? moveFunction(movePlayerCommand)
                : createPlayerMoveFailedEvent({ message: message });
        };
    }

    private validateMove(
        movePlayerCommand: MovePlayerCommand
    ): ValidationResult {
        const {
            payload: {
                player,
                targetCell: { row, column }
            }
        } = movePlayerCommand;

        if (this.getActivePlayer() !== player) {
            return {
                isValid: false,
                message: `Player ${player} cannot move as player ${this.getActivePlayer()} is currently active`
            };
        }

        const { isValidRow, isValidColumn } = this.getIsCellOnBoard(
            row,
            column
        );

        if (!isValidRow && !isValidColumn) {
            return {
                isValid: false,
                message: `Cell at row ${row} and column ${column} doesn't exist on the board. The row number must be >= 0 and <= ${this.board.length - 1} and the column number must be >= 0 and <= ${this.board[0].length - 1}`
            };
        }

        if (!isValidRow || !isValidColumn) {
            return {
                isValid: false,
                message: `Cell at row ${row} and column ${column} doesn't exist on the board. ${!isValidRow ? `The row number must be >= 0 and <= ${this.board.length - 1}` : ''}${!isValidColumn ? `The column number must be >= 0 and <= ${this.board[0].length - 1}` : ''}`
            };
        }

        if (this.getIsCellOccupied(row, column)) {
            return {
                isValid: false,
                message: `The cell of row ${row} and column ${column} is already occupied`
            };
        }

        if (!this.getIsCellOccupied(row - 1, column)) {
            return {
                isValid: false,
                message: `The cell of row ${row} and column ${column} cannot be placed as there is no disc below it`
            };
        }

        return {
            isValid: true,
            message: ''
        };
    }

    private getIsCellOnBoard(row: number, column: number): ValidCellOnBoard {
        return {
            isValidRow: row >= 0 && row <= this.board.length - 1,
            isValidColumn: column >= 0 && column <= this.board[0].length - 1
        };
    }

    private getIsCellOccupied(row: number, column: number): boolean {
        if (row < 0) return true; // Assume row < 0 means it's occupied by boundary logic.
        return this.board[row][column].player !== undefined;
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
