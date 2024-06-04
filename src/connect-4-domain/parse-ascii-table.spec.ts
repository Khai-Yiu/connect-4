import { describe, it, expect } from 'vitest';
import parseAsciiTable from '@/connect-4-domain/parse-ascii-table';

describe('parse-ascii-table', () => {
    describe('given a table with no rows and columns', () => {
        it('returns an empty grid', () => {
            const emptyTable = '';
            expect(parseAsciiTable(emptyTable)).toEqual([]);
        });
    });
    describe('given a 1x1 ascii table', () => {
        describe('with an empty cell', () => {
            it('returns a 1x1 grid with an empty cell', () => {
                const table = `
|--|
|  |
|--|`;
                expect(parseAsciiTable(table)).toEqual([[undefined]]);
            });
        });
        describe('with a non-empty cell', () => {
            it('returns a 1x1 grid with a non-empty cell', () => {
                const table = `
|---|
| 1 |
|---|`;
                expect(parseAsciiTable(table)).toEqual([['1']]);
            });
        });
    });
});
