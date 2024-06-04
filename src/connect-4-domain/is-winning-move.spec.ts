import { describe, it, expect } from 'vitest';
import isWinningMove from '@/connect-4-domain/is-winning-move';
import parseAsciiTable from '@/connect-4-domain/parse-ascii-table';
import { BoardCell, PlayerMove } from '@/connect-4-domain/game';

describe('is-winning-move', () => {
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
    });
});
