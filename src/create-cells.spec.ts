import { describe, it, expect } from 'vitest';
import createCells from '@/create-cells';

describe('create-cells', () => {
    it('returns a 0x0 board given defaults', () => {
        expect(createCells()).toEqual([]);
    });
    it('returns a row x column board given the number of rows and columns', () => {
        const board = createCells(2, 3);

        expect(board.length).toEqual(2);
        expect(board[0].length).toEqual(3);
    });
    it('returns a board filled with objects conforming to BoardCellProps type', () => {
        expect(createCells(2, 2)).toEqual([
            [
                {
                    player: undefined
                },
                {
                    player: undefined
                }
            ],
            [
                {
                    player: undefined
                },
                {
                    player: undefined
                }
            ]
        ]);
    });
});
