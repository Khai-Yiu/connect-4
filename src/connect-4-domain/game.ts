type BoardCell = {
    player: 1 | 2 | undefined;
};

type GameParameters = {
    boardDimensions: { rows: number; columns: number };
};

interface Game {
    getBoard: () => Array<Array<BoardCell>>;
}

class GameFactory implements Game {
    private board: Array<Array<BoardCell>>;

    constructor(
        { boardDimensions }: GameParameters = {
            boardDimensions: { rows: 6, columns: 7 }
        }
    ) {
        this.board = this.createBoard(boardDimensions);
    }

    getBoard = () => {
        return this.board.map((row) => row.map((cell) => ({ ...cell })));
    };

    private createBoard(boardDimensions: {
        rows: number;
        columns: number;
    }): Array<Array<BoardCell>> {
        return new Array(boardDimensions.rows).fill(undefined).map(() =>
            new Array(boardDimensions.columns).fill(undefined).map(() => ({
                player: undefined
            }))
        );
    }
}

export default GameFactory;
