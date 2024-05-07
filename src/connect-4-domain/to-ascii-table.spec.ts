import { describe, expect, it } from 'vitest';
import toAsciiTable from './to-ascii-table';
describe('to-ascii-table', () => {
    describe('given an empty grid', () => {
        it('returns an empty ascii table', () => {
            const asciiTable = toAsciiTable([]);
            expect(asciiTable).toEqual('');
        });
    });
    describe('given a one row grid', () => {
        describe('with one column', () => {
            it('returns a 1x1 ascii table', () => {
                const asciiTable = toAsciiTable<string>([['1']]);
                expect(asciiTable).toEqual(`
|---|
| 1 |
|---|
`);
            });
            describe('with content greater than 1 character in length', () => {
                it('returns a 1x1 ascii table', () => {
                    const asciiTable = toAsciiTable<string>([['10']]);
                    expect(asciiTable).toEqual(`
|----|
| 10 |
|----|                    
                    `);
                });
            });
        });
    });
});
