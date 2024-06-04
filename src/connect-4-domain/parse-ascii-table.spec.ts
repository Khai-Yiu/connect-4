import { describe, it, expect } from 'vitest';
import parseAsciiTable from '@/connect-4-domain/parse-ascii-table';

describe('parse-ascii-table', () => {
    describe('given a table with no rows and columns', () => {
        it('returns an empty grid', () => {
            const emptyTable = '';
            expect(parseAsciiTable(emptyTable)).toEqual([]);
        });
    });
});
