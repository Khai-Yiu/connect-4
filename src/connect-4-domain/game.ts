import { MovePlayerCommand } from '@/connect-4-domain/commands';
import deepClone from '@/connect-4-domain/deep-clone';
import {
    PlayerMoveFailedEvent,
    PlayerMovedEvent,
    createPlayerMoveFailedEvent,
    createPlayerMovedEvent
} from '@/connect-4-domain/events';
import {
    Board,
    BoardCell,
    BoardDimensions,
    GameParameters,
    GameRepository,
    GameUuid,
    PersistedGame,
    PlayerNumber,
    PlayerStats,
    Status,
    ValidCellOnBoard,
    ValidationResult
} from '@/connect-4-domain/game-types';
import getIsWinningMove from '@/connect-4-domain/get-is-winning-move';

export interface GameRepositoryInterface {
    save: (persistedGame: PersistedGame, gameId?: GameUuid) => GameUuid;
    load: (gameUuid: GameUuid) => PersistedGame | undefined;
}

interface Game {
    getBoard: () => Board;
    getPlayerStats: (playerNumber: PlayerNumber) => PlayerStats;
    getActivePlayer: () => PlayerNumber;
    getStatus: () => Status;
    save: () => GameUuid;
    load: (gameId: GameUuid) => void;
    move: (
        movePlayerCommand: MovePlayerCommand
    ) => PlayerMoveFailedEvent | PlayerMovedEvent;
}

export class InvalidBoardDimensionsError extends RangeError {}

class GameFactory implements Game {
    private board: Board;
    private players: Record<PlayerNumber, PlayerStats>;
    private activePlayer: PlayerNumber;
    private status: Status;
    private repository: GameRepository;

    constructor(
        {
            boardDimensions = { rows: 6, columns: 7 },
            repository
        }: GameParameters = {
            boardDimensions: {
                rows: 6,
                columns: 7
            }
        }
    ) {
        this.validateBoardDimensions(boardDimensions);
        this.board = this.createBoard(boardDimensions);
        this.players = this.createPlayers(boardDimensions);
        this.activePlayer = 1;
        this.status = Status.IN_PROGRESS;
        this.repository = repository;
    }

    getBoard = () => {
        return deepClone(this.board);
    };

    getPlayerStats = (playerNumber: PlayerNumber): PlayerStats => {
        return this.players[playerNumber];
    };

    getActivePlayer = (): PlayerNumber => this.activePlayer;

    getStatus = (): Status => {
        return this.status;
    };

    save(): GameUuid {
        if (this.repository !== undefined) {
            const gameUuid = crypto.randomUUID();

            this.repository?.save(
                {
                    board: this.getBoard(),
                    activePlayer: this.activePlayer,
                    players: this.players,
                    status: this.status
                },
                gameUuid
            );

            return gameUuid;
        } else {
            throw new Error('No repository initialised.');
        }
    }

    load(gameId: GameUuid) {
        const gameToLoad = this.repository?.load(gameId);

        if (gameToLoad !== undefined) {
            const { board, activePlayer, players, status } = gameToLoad;
            this.board = board;
            this.activePlayer = activePlayer;
            this.players = players;
            this.status = status;
        } else {
            throw new Error('The provided game UUID is invalid.');
        }
    }

    move = this.createValidatedMove(this._move.bind(this));

    private _move({
        payload: {
            player,
            targetCell: { row, column }
        }
    }: MovePlayerCommand): PlayerMovedEvent | PlayerMoveFailedEvent {
        const { isWin } = getIsWinningMove(this.getBoard(), {
            player,
            targetCell: { row, column }
        });

        this.board[row][column] = { player: player };
        this.players[this.activePlayer].remainingDiscs--;
        this.activePlayer = this.activePlayer === 2 ? 1 : 2;

        if (isWin) {
            this.status =
                this.activePlayer === 2
                    ? Status.PLAYER_ONE_WIN
                    : Status.PLAYER_TWO_WIN;
        } else if (
            this.players[1].remainingDiscs === 0 &&
            this.players[2].remainingDiscs === 0
        ) {
            this.status = Status.DRAW;
        }

        return createPlayerMovedEvent({
            player,
            targetCell: { row, column }
        });
    }

    private createValidatedMove(
        moveFunction: (
            movePlayerCommand: MovePlayerCommand
        ) => PlayerMovedEvent | PlayerMoveFailedEvent
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
        if (this.status === 'PLAYER_ONE_WIN') {
            return {
                isValid: false,
                message:
                    'You cannot make a move, player 1 has already won the game'
            };
        } else if (this.status === Status.PLAYER_TWO_WIN) {
            return {
                isValid: false,
                message:
                    'You cannot make a move, player 2 has already won the game'
            };
        } else if (this.status === Status.DRAW) {
            return {
                isValid: false,
                message:
                    'You cannot make a move, the game has already ended in a draw'
            };
        }

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
