import { describe, it, expect } from 'vitest';
import GameFactory, {
    BoardCell,
    InvalidBoardDimensionsError
} from '@/connect-4-domain/game';
import _toAsciiTable from '@/connect-4-domain/to-ascii-table';

function toAsciiTable(board: Array<Array<BoardCell>>): string {
    const cellResolver = (cell: BoardCell) =>
        cell.player === undefined ? '' : `${cell.player}`;

    return _toAsciiTable(board, cellResolver);
}

describe('game', () => {
    describe('new game', () => {
        describe('given defaults', () => {
            it('returns an instance of Game', () => {
                const game = new GameFactory();
                expect(game).toBeInstanceOf(GameFactory);
            });
            it('creates a 6x7 board', () => {
                const game = new GameFactory();
                const board = game.getBoard();
                const asciiBoard = toAsciiTable(board);
                expect(asciiBoard).toMatchInlineSnapshot(`
                  "
                  |--|--|--|--|--|--|--|
                  |  |  |  |  |  |  |  |
                  |--|--|--|--|--|--|--|
                  |  |  |  |  |  |  |  |
                  |--|--|--|--|--|--|--|
                  |  |  |  |  |  |  |  |
                  |--|--|--|--|--|--|--|
                  |  |  |  |  |  |  |  |
                  |--|--|--|--|--|--|--|
                  |  |  |  |  |  |  |  |
                  |--|--|--|--|--|--|--|
                  |  |  |  |  |  |  |  |
                  |--|--|--|--|--|--|--|"
                `);
            });
            it(`creates a game where player 1 starts with half the tokens of the number of cells`, () => {
                const game = new GameFactory();
                expect(game.getPlayerStats(1)).toEqual(
                    expect.objectContaining({
                        playerNumber: 1,
                        remainingDiscs: 21
                    })
                );
            });
            it(`creates a game where player 2 starts with half the tokens of the number of cells`, () => {
                const game = new GameFactory();
                expect(game.getPlayerStats(2)).toEqual(
                    expect.objectContaining({
                        playerNumber: 2,
                        remainingDiscs: 21
                    })
                );
            });
            it('creates a deep copy of the board', () => {
                const game = new GameFactory();
                const boardOne = game.getBoard();
                const boardTwo = game.getBoard();
                expect(boardTwo).toBeDeeplyUnequal(boardOne);
            });
            it.todo(
                "changes made to the game after a getBoard call don't affect copies of the board",
                () => {}
            );
        });
        describe('given custom board dimensions', () => {
            describe('with 0 rows', () => {
                it('throws an error', () => {
                    expect(
                        () =>
                            new GameFactory({
                                boardDimensions: { rows: 0, columns: 7 }
                            })
                    ).toThrowError(
                        new InvalidBoardDimensionsError(
                            'Number of rows must be greater than or equal to 1'
                        )
                    );
                });
            });
            describe('with 0 columns', () => {
                it('throws an error', () => {
                    expect(
                        () =>
                            new GameFactory({
                                boardDimensions: { rows: 6, columns: 0 }
                            })
                    ).toThrowError(
                        new InvalidBoardDimensionsError(
                            'Number of rows must be greater than or equal to 1'
                        )
                    );
                });
            });
            describe('which result in an odd number of cells', () => {
                it('throws an error', () => {
                    expect(
                        () =>
                            new GameFactory({
                                boardDimensions: { rows: 3, columns: 3 }
                            })
                    ).toThrowError(
                        new InvalidBoardDimensionsError(
                            `The total number of cells on a board must be even. The supplied board dimensions 3 x 3 result in an odd number of cells`
                        )
                    );
                });
            });
            describe('which result in an even number of cells', () => {
                it('returns an instance of Game', () => {
                    const game = new GameFactory({
                        boardDimensions: { rows: 6, columns: 6 }
                    });
                    const board = game.getBoard();
                    const asciiBoard = toAsciiTable(board);
                    expect(asciiBoard).toMatchInlineSnapshot(`
                      "
                      |--|--|--|--|--|--|
                      |  |  |  |  |  |  |
                      |--|--|--|--|--|--|
                      |  |  |  |  |  |  |
                      |--|--|--|--|--|--|
                      |  |  |  |  |  |  |
                      |--|--|--|--|--|--|
                      |  |  |  |  |  |  |
                      |--|--|--|--|--|--|
                      |  |  |  |  |  |  |
                      |--|--|--|--|--|--|
                      |  |  |  |  |  |  |
                      |--|--|--|--|--|--|"
                    `);
                });
            });
        });
    });
});
