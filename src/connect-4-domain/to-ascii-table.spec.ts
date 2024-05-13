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
            describe('and a custom cell resolver', () => {
                it("uses the custom cell resolver to resolve the cell's value", () => {
                    const customResolver = (value: any) =>
                        value === null ? '💩' : '';

                    const asciiTable = toAsciiTable([[null]], customResolver);
                    expect(asciiTable).toEqual(`
|----|
| 💩 |
|----|`);
                });
            });
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
        describe('and multiple columns', () => {
            describe('of the same length', () => {
                it('returns an ascii table with 1 row and multiple columns', () => {
                    const asciiTable = toAsciiTable([[], []]);
                    expect(asciiTable).toEqual(`
|--|--|
|  |  |
|--|--|`);
                });
            });
        });
    });
});
