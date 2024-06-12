import { createMovePlayerCommand } from '@/connect-4-domain/commands';
import GameFactory, {
    BoardCell,
    InvalidBoardDimensionsError
} from '@/connect-4-domain/game';
import _toAsciiTable from '@/connect-4-domain/to-ascii-table';
import { describe, expect, it } from 'vitest';

function toAsciiTable(board: Array<Array<BoardCell>>): string {
    const cellResolver = (cell: BoardCell) =>
        cell.player === undefined ? '' : `${cell.player}`;

    return _toAsciiTable(board, cellResolver);
}

describe('game', () => {
    describe('new game', () => {
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
        it("changes made to the game don't affect prior copies of the board", () => {
            const game = new GameFactory();
            const originalBoard = game.getBoard();
            expect(toAsciiTable(originalBoard)).toMatchInlineSnapshot(`
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
            const movePlayerCommand = createMovePlayerCommand({
                player: 1,
                targetCell: {
                    row: 0,
                    column: 0
                }
            });
            game.move(movePlayerCommand);
            expect(toAsciiTable(originalBoard)).toMatchInlineSnapshot(`
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
            const boardAfterMove = game.getBoard();
            expect(toAsciiTable(boardAfterMove)).toMatchInlineSnapshot(`
              "
              |---|--|--|--|--|--|--|
              | 1 |  |  |  |  |  |  |
              |---|--|--|--|--|--|--|
              |   |  |  |  |  |  |  |
              |---|--|--|--|--|--|--|
              |   |  |  |  |  |  |  |
              |---|--|--|--|--|--|--|
              |   |  |  |  |  |  |  |
              |---|--|--|--|--|--|--|
              |   |  |  |  |  |  |  |
              |---|--|--|--|--|--|--|
              |   |  |  |  |  |  |  |
              |---|--|--|--|--|--|--|"
            `);
            expect(boardAfterMove).toBeDeeplyUnequal(originalBoard);
        });
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
                it('player should not be able to move to a cell with a row number below the first row', () => {
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
                                "Cell at row -1 and column 0 doesn't exist on the board. The row number must be >= 0 and <= 1"
                        }
                    });
                    expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(
                        `
                      "
                      |--|--|
                      |  |  |
                      |--|--|
                      |  |  |
                      |--|--|"
                    `
                    );
                    expect(game.getActivePlayer()).toBe(1);
                });
                it('player should not be able to move to a cell with a row number above the last row', () => {
                    const game = new GameFactory({
                        boardDimensions: { rows: 2, columns: 2 }
                    });
                    const movePlayerCommand = createMovePlayerCommand({
                        player: 1,
                        targetCell: {
                            row: 2,
                            column: 0
                        }
                    });
                    const event = game.move(movePlayerCommand);
                    expect(toAsciiTable(game.getBoard()))
                        .toMatchInlineSnapshot(`
                      "
                      |--|--|
                      |  |  |
                      |--|--|
                      |  |  |
                      |--|--|"
                    `);
                    expect(game.getActivePlayer()).toBe(1);
                    expect(event).toEqual({
                        type: 'PLAYER_MOVE_FAILED',
                        payload: {
                            message:
                                "Cell at row 2 and column 0 doesn't exist on the board. The row number must be >= 0 and <= 1"
                        }
                    });
                });
                it('player should not be able to move to a cell with a column number to the left of the first column', () => {
                    const game = new GameFactory({
                        boardDimensions: { rows: 2, columns: 2 }
                    });
                    const movePlayerCommand = createMovePlayerCommand({
                        player: 1,
                        targetCell: {
                            row: 0,
                            column: -1
                        }
                    });
                    const event = game.move(movePlayerCommand);
                    expect(toAsciiTable(game.getBoard()))
                        .toMatchInlineSnapshot(`
                      "
                      |--|--|
                      |  |  |
                      |--|--|
                      |  |  |
                      |--|--|"
                    `);
                    expect(game.getActivePlayer()).toBe(1);
                    expect(event).toEqual({
                        type: 'PLAYER_MOVE_FAILED',
                        payload: {
                            message:
                                "Cell at row 0 and column -1 doesn't exist on the board. The column number must be >= 0 and <= 1"
                        }
                    });
                });
                it('player should not be able to move to a cell with a column number to the right of the last column', () => {
                    const game = new GameFactory({
                        boardDimensions: { rows: 2, columns: 2 }
                    });
                    const movePlayerCommand = createMovePlayerCommand({
                        player: 1,
                        targetCell: {
                            row: 0,
                            column: 2
                        }
                    });
                    const event = game.move(movePlayerCommand);
                    expect(toAsciiTable(game.getBoard()))
                        .toMatchInlineSnapshot(`
                      "
                      |--|--|
                      |  |  |
                      |--|--|
                      |  |  |
                      |--|--|"
                    `);
                    expect(game.getActivePlayer()).toBe(1);
                    expect(event).toEqual({
                        type: 'PLAYER_MOVE_FAILED',
                        payload: {
                            message:
                                "Cell at row 0 and column 2 doesn't exist on the board. The column number must be >= 0 and <= 1"
                        }
                    });
                });
                it('player should not be able to move to a cell with a row and column number out of bounds', () => {
                    const game = new GameFactory({
                        boardDimensions: { rows: 2, columns: 3 }
                    });
                    const movePlayerCommand = createMovePlayerCommand({
                        player: 1,
                        targetCell: {
                            row: -1,
                            column: -1
                        }
                    });
                    const event = game.move(movePlayerCommand);
                    expect(toAsciiTable(game.getBoard()))
                        .toMatchInlineSnapshot(`
                          "
                          |--|--|--|
                          |  |  |  |
                          |--|--|--|
                          |  |  |  |
                          |--|--|--|"
                        `);
                    expect(game.getActivePlayer()).toBe(1);
                    expect(event).toEqual({
                        type: 'PLAYER_MOVE_FAILED',
                        payload: {
                            message:
                                "Cell at row -1 and column -1 doesn't exist on the board. The row number must be >= 0 and <= 1 and the column number must be >= 0 and <= 2"
                        }
                    });
                });
            });
            describe('and the cell is on the first row', () => {
                describe('and the cell is unoccupied', () => {
                    it('player should be able to move a disc into the cell', () => {
                        const game = new GameFactory({
                            boardDimensions: { rows: 1, columns: 2 }
                        });
                        const movePlayerCommand = createMovePlayerCommand({
                            player: 1,
                            targetCell: {
                                row: 0,
                                column: 0
                            }
                        });
                        expect(toAsciiTable(game.getBoard()))
                            .toMatchInlineSnapshot(`
                        "
                        |--|--|
                        |  |  |
                        |--|--|"
                        `);
                        expect(game.getActivePlayer()).toBe(1);

                        const playerMovedEvent = game.move(movePlayerCommand);
                        expect(playerMovedEvent).toEqual({
                            type: 'PLAYER_MOVED',
                            payload: {
                                player: 1,
                                targetCell: {
                                    row: 0,
                                    column: 0
                                }
                            }
                        });
                        expect(toAsciiTable(game.getBoard()))
                            .toMatchInlineSnapshot(`
                          "
                          |---|--|
                          | 1 |  |
                          |---|--|"
                        `);
                        expect(game.getActivePlayer()).toBe(2);
                    });
                });
                describe('and the cell is occupied', () => {
                    it('the move fails', () => {
                        const game = new GameFactory({
                            boardDimensions: { rows: 1, columns: 2 }
                        });
                        const movePlayerCommand = createMovePlayerCommand({
                            player: 1,
                            targetCell: {
                                row: 0,
                                column: 0
                            }
                        });
                        game.move(movePlayerCommand);
                        expect(toAsciiTable(game.getBoard()))
                            .toMatchInlineSnapshot(`
                              "
                              |---|--|
                              | 1 |  |
                              |---|--|"
                            `);
                        const movePlayerCommand2 = createMovePlayerCommand({
                            player: 2,
                            targetCell: {
                                row: 0,
                                column: 0
                            }
                        });
                        const playerMovedEvent = game.move(movePlayerCommand2);
                        expect(playerMovedEvent).toEqual({
                            type: 'PLAYER_MOVE_FAILED',
                            payload: {
                                message:
                                    'The cell of row 0 and column 0 is already occupied'
                            }
                        });
                        expect(game.getActivePlayer()).toBe(2);
                    });
                });
            });
            describe('and the cell is on the second row', () => {
                describe('and the cell below is occupied', () => {
                    it('player should be able to move a disc into the cell', () => {
                        const game = new GameFactory({
                            boardDimensions: { rows: 2, columns: 2 }
                        });
                        const movePlayerCommand = createMovePlayerCommand({
                            player: 1,
                            targetCell: {
                                row: 0,
                                column: 0
                            }
                        });
                        game.move(movePlayerCommand);
                        expect(toAsciiTable(game.getBoard()))
                            .toMatchInlineSnapshot(`
                              "
                              |---|--|
                              | 1 |  |
                              |---|--|
                              |   |  |
                              |---|--|"
                            `);
                        const movePlayerCommand2 = createMovePlayerCommand({
                            player: 2,
                            targetCell: {
                                row: 1,
                                column: 0
                            }
                        });
                        game.move(movePlayerCommand2);
                        expect(toAsciiTable(game.getBoard()))
                            .toMatchInlineSnapshot(`
                              "
                              |---|--|
                              | 1 |  |
                              |---|--|
                              | 2 |  |
                              |---|--|"
                            `);
                    });
                });
                describe('and the cell below is unoccupied', () => {
                    it('player should not be able to move a disc into the cell', () => {
                        const game = new GameFactory({
                            boardDimensions: { rows: 2, columns: 2 }
                        });
                        const movePlayerCommand = createMovePlayerCommand({
                            player: 1,
                            targetCell: {
                                row: 1,
                                column: 0
                            }
                        });
                        const playerMovedEvent = game.move(movePlayerCommand);
                        expect(playerMovedEvent).toEqual({
                            type: 'PLAYER_MOVE_FAILED',
                            payload: {
                                message:
                                    'The cell of row 1 and column 0 cannot be placed as there is no disc below it'
                            }
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
                    });
                });
            });
        });
        describe('given a player is currently inactive', () => {
            it('the player is unable to make a move', () => {
                const game = new GameFactory({
                    boardDimensions: { rows: 2, columns: 2 }
                });
                const movePlayerCommand = createMovePlayerCommand({
                    player: 2,
                    targetCell: {
                        row: 0,
                        column: 0
                    }
                });
                expect(game.getActivePlayer()).toBe(1);
                const playerMovedEvent = game.move(movePlayerCommand);
                expect(playerMovedEvent).toEqual({
                    type: 'PLAYER_MOVE_FAILED',
                    payload: {
                        message:
                            'Player 2 cannot move as player 1 is currently active'
                    }
                });
            });
        });
    });
    describe('getting the status of the game', () => {
        describe('given a new game', () => {
            it('reports the status as in progress', () => {
                const game = new GameFactory();
                const gameStatus = game.getStatus();
                expect(gameStatus).toBe('IN_PROGRESS');
            });
        });
        describe('and a player has won', () => {
            it('reports the status as won', () => {
                const game = new GameFactory({
                    boardDimensions: {
                        rows: 1,
                        columns: 8
                    }
                });
                const setupMoves = [
                    [0, 0],
                    [0, 7],
                    [0, 1],
                    [0, 6],
                    [0, 2],
                    [0, 5]
                ];
                for (let i = 0; i < 6; i++) {
                    game.move(
                        createMovePlayerCommand({
                            player: i % 2 === 0 ? 1 : 2,
                            targetCell: {
                                row: setupMoves[i][0],
                                column: setupMoves[i][1]
                            }
                        })
                    );
                }

                const movePlayerCommand = createMovePlayerCommand({
                    player: 1,
                    targetCell: {
                        row: 0,
                        column: 3
                    }
                });

                game.move(movePlayerCommand);
                const gameStatus = game.getStatus();
                expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
                  "
                  |---|---|---|---|--|---|---|---|
                  | 1 | 1 | 1 | 1 |  | 2 | 2 | 2 |
                  |---|---|---|---|--|---|---|---|"
                `);
                expect(gameStatus).toBe('PLAYER_ONE_WIN');
            });
        });
    });
});
