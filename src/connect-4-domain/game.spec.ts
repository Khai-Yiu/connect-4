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
            describe('with negative number of rows', () => {
                it('throws an error', () => {
                    expect(
                        () =>
                            new GameFactory({
                                boardDimensions: { rows: -1, columns: 7 }
                            })
                    ).toThrowError(
                        new InvalidBoardDimensionsError(
                            'Number of rows must be greater than or equal to 1'
                        )
                    );
                });
            });
            describe('with negative number of columns', () => {
                it('throws an error', () => {
                    expect(
                        () =>
                            new GameFactory({
                                boardDimensions: { rows: -1, columns: 7 }
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
        it('returns the currently active player', () => {
            const game = new GameFactory();
            const player = game.getActivePlayer();
            expect(player).toBe(1);
        });
    });
    describe('making a move', () => {
        describe('given a player is currently active', () => {
            describe("and a cell location that's not on the board", () => {
                it('player should not be able to move', () => {
                    const game = new GameFactory({
                        boardDimensions: { rows: 2, columns: 2 }
                    });
                    expect(toAsciiTable(game.getBoard()))
                        .toMatchInlineSnapshot(`
                      "
                      |--|--|
                      |  |  |
                      |--|--|
                      |  |  |
                      |--|--|"
                    `);
                    const movePlayerCommand = createMovePlayerCommand({
                        player: 1,
                        targetCell: { row: -1, column: 0 }
                    });
                    const event = game.move(movePlayerCommand);
                    expect(event).toEqual({
                        type: 'PLAYER_MOVE_FAILED',
                        payload: {
                            message:
                                "Cell at row -1 and column 0 doesn't exist on the board. The row number must be >= 1 and <= 1"
                        }
                    });
                });
            });
        });
    });
});
