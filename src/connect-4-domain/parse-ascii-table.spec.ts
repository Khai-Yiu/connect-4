import { describe, it, expect } from 'vitest';

describe('parse-ascii-table', () => {
    describe('given a table with no rows and columns', () => {
        it('returns an empty grid', () => {
            const emptyTable = '';
            expect(parseAsciiTable(emptyTable)).toEqual([]);
        });
    });
});
