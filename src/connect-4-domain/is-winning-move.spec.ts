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
});
