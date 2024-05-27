import { B } from 'vitest/dist/reporters-P7C2ytIv.js';

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

class GameFactory implements Game {
    private board: Board;
    private players: Record<PlayerNumber, PlayerStats>;

    constructor(
        { boardDimensions }: GameParameters = {
            boardDimensions: { rows: 6, columns: 7 }
        }
    ) {
        this.board = this.createBoard(boardDimensions);
        this.players = this.createPlayers(boardDimensions);
    }

    getBoard = () => {
        return this.board;
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
