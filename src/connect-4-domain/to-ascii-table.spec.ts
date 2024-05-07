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
            describe('containing a string', () => {
                describe('and the string is empty', () => {
                    it('returns a 1x1 ascii table', () => {
                        const asciiTable = toAsciiTable([['']]);
                        expect(asciiTable).toEqual(`
|--|
|  |
|--|`);
                    });
                });
                describe('with content 1 character in length', () => {
                    it('returns a 1x1 ascii table', () => {
                        const asciiTable = toAsciiTable([['1']]);
                        expect(asciiTable).toEqual(`
|---|
| 1 |
|---|`);
                    });
                });
                describe('with content greater than 1 character in length', () => {
                    it('returns a 1x1 ascii table', () => {
                        const asciiTable = toAsciiTable([['10']]);
                        expect(asciiTable).toEqual(`
|----|
| 10 |
|----|`);
                    });
                });
            });
            describe("containing 'undefined'", () => {
                it('returns a 1x1 ascii table', () => {
                    const asciiTable = toAsciiTable([[undefined]]);
                    expect(asciiTable).toEqual(`
|--|
|  |
|--|`);
                });
            });
            describe('containing null', () => {
                it('returns a 1x1 ascii table', () => {
                    const asciiTable = toAsciiTable([[null]]);
                    expect(asciiTable).toEqual(`
|--|
|  |
|--|`);
                });
            });
        });
    });
});
