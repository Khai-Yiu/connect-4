import { describe, it, expect } from 'vitest';
import isWinningMove from '@/connect-4-domain/is-winning-move';
import parseAsciiTable from '@/connect-4-domain/parse-ascii-table';
import { BoardCell, PlayerMove } from '@/connect-4-domain/game';

describe('is-winning-move', () => {
    const customResolver = (value: string): BoardCell => {
        const parsedValue = Number.parseInt(value);

        if (parsedValue === 1 || parsedValue === 2) {
            return {
                player: parsedValue
            };
        }

        return {
            player: undefined
        };
    };

    describe("given a board and the next player's move", () => {
        describe('results in a vertical win', () => {
            describe('and the player move results in a win', () => {
                it('detects the win', () => {
                    const table = `
|---|---|
| 1 | 2 |
|---|---|
| 1 | 2 |
|---|---|
| 1 | 2 |
|---|---|
|   |   |
|---|---|`;
                    const board = parseAsciiTable(table, customResolver);
                    const playerMove = {
                        player: 1,
                        targetCell: {
                            row: 3,
                            column: 0
                        }
                    } as PlayerMove;
                    expect(isWinningMove(board, playerMove)).toEqual(
                        expect.objectContaining({
                            isWin: true
                        })
                    );
                });
            });
            describe('and there are less than 4 rows on the board', () => {
                it('does not result in a vertical win', () => {
                    const table = `
    |---|---|
    | 1 | 2 |
    |---|---|
    | 1 | 2 |
    |---|---|
    |   |   |
    |---|---|`;
                    const playerMove = {
                        player: 1,
                        targetCell: {
                            row: 2,
                            column: 0
                        }
                    } as PlayerMove;
                    const board = parseAsciiTable(table, customResolver);
                    expect(isWinningMove(board, playerMove)).toEqual(
                        expect.objectContaining({
                            isWin: false
                        })
                    );
                });
            });
            describe('and the winning column does not touch the board', () => {
                describe('and the player move results in a vertical win', () => {
                    it('detects the win', () => {
                        const table = `
    |---|---|
    | 1 | 2 |
    |---|---|
    | 1 | 2 |
    |---|---|
    | 1 | 2 |
    |---|---|
    |   |   |
    |---|---|
    |   |   |
    |---|---|`;
                        const playerMove = {
                            player: 1,
                            targetCell: {
                                row: 3,
                                column: 0
                            }
                        } as PlayerMove;
                        const board = parseAsciiTable(table, customResolver);
                        expect(isWinningMove(board, playerMove)).toEqual(
                            expect.objectContaining({
                                isWin: true
                            })
                        );
                    });
                });
            });
        });
        describe('results in a horizontal win', () => {
            describe("and there are 3 of the active player's tokens to the left of the target cell", () => {
                it('detects the win', () => {
                    const table = `
|---|---|---|---|
| 1 | 1 | 1 |   |
|---|---|---|---|
| 2 | 2 | 2 |   |
|---|---|---|---|`;
                    const playerMove = {
                        player: 1,
                        targetCell: {
                            row: 0,
                            column: 3
                        }
                    } as PlayerMove;
                    const board = parseAsciiTable(table, customResolver);
                    expect(isWinningMove(board, playerMove)).toEqual(
                        expect.objectContaining({
                            isWin: true
                        })
                    );
                });
            });
            describe("and there are 3 of the active player's tokens to the right of the target cell", () => {
                it('detects the win', () => {
                    const table = `
|---|---|---|---|
|   | 1 | 1 | 1 |
|---|---|---|---|
|   | 2 | 2 | 2 |
|---|---|---|---|`;
                    const playerMove = {
                        player: 1,
                        targetCell: {
                            row: 0,
                            column: 0
                        }
                    } as PlayerMove;
                    const board = parseAsciiTable(table, customResolver);
                    expect(isWinningMove(board, playerMove)).toEqual(
                        expect.objectContaining({
                            isWin: true
                        })
                    );
                });
            });
            describe("and there are 2 of the active player's tokens to the left and 1 to the right of the target cell", () => {
                it('detects the win', () => {
                    const table = `
|---|---|---|---|
| 1 |   | 1 | 1 |
|---|---|---|---|
|   | 2 | 2 | 2 |
|---|---|---|---|`;
                    const playerMove = {
                        player: 1,
                        targetCell: {
                            row: 0,
                            column: 1
                        }
                    } as PlayerMove;
                    const board = parseAsciiTable(table, customResolver);
                    expect(isWinningMove(board, playerMove)).toEqual(
                        expect.objectContaining({
                            isWin: true
                        })
                    );
                });
            });
            describe('and there are less than 3 columns to the left of the target cell', () => {
                it('does not result in a horizontal win', () => {
                    const table = `
|---|---|---|
| 1 | 1 |   |
|---|---|---|
| 2 | 2 |   |
|---|---|---|`;
                    const playerMove = {
                        player: 1,
                        targetCell: {
                            row: 0,
                            column: 2
                        }
                    } as PlayerMove;
                    const board = parseAsciiTable(table, customResolver);
                    expect(isWinningMove(board, playerMove)).toEqual(
                        expect.objectContaining({
                            isWin: false
                        })
                    );
                });
            });
            describe('and there are less than 3 columns to the right of the target cell', () => {
                it('does not result in a horizontal win', () => {
                    const table = `
|---|---|---|
|   | 1 | 1 |
|---|---|---|
|   | 2 | 2 |
|---|---|---|`;
                    const playerMove = {
                        player: 1,
                        targetCell: {
                            row: 0,
                            column: 1
                        }
                    } as PlayerMove;
                    const board = parseAsciiTable(table, customResolver);
                    expect(isWinningMove(board, playerMove)).toEqual(
                        expect.objectContaining({
                            isWin: false
                        })
                    );
                });
            });
        });
    });
});
