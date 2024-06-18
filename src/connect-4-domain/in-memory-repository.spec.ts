import { Board, BoardCell } from '@/connect-4-domain/game';
import InMemoryRepository from '@/connect-4-domain/in-memory-repository';
import parseAsciiTable from '@/connect-4-domain/parse-ascii-table';
import { describe, expect, it } from 'vitest';

describe('in-memory-repository', () => {
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
    describe('given defaults', () => {
        it('creates an in-memory repository', () => {
            const repository = new InMemoryRepository();
            expect(repository).toBeInstanceOf(InMemoryRepository);
        });
        it('loads a saved board', () => {
            const repository = new InMemoryRepository();
            const asciiTable = `
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|`;
            const board: Board = parseAsciiTable(asciiTable);
            const boardId = repository.save(board);
            expect(repository.load(boardId)).toBe(board);
        });
        it('returns undefined when loading a non-existent board', () => {
            const repository = new InMemoryRepository();
            const boardId = crypto.randomUUID();
            expect(repository.load(boardId)).toBe(undefined);
        });
    });
    describe('given a store', () => {
        it('saves a board', () => {
            const store = new Map();
            const repository = new InMemoryRepository(store);
            const asciiTable = `
    |---|---|---|---|
    |   |   |   |   |
    |---|---|---|---|
    |   |   |   |   |
    |---|---|---|---|`;
            const board = parseAsciiTable(asciiTable, customResolver);
            const boardId = repository.save(board);
            expect(store.get(boardId)).toBe(board);
        });
        it('saves a board with a provided UUID', () => {
            const store = new Map();
            const repository = new InMemoryRepository(store);
            const asciiTable = `
    |---|---|---|---|
    |   |   |   |   |
    |---|---|---|---|
    |   |   |   |   |
    |---|---|---|---|`;
            const board = parseAsciiTable(asciiTable, customResolver);
            const boardId = crypto.randomUUID();
            const retrievedBoardId = repository.save(board, boardId);
            expect(store.get(retrievedBoardId)).toBe(board);
        });
        it('loads a saved board', () => {
            const store = new Map();
            const repository = new InMemoryRepository(store);
            const asciiTable = `
    |---|---|---|---|
    |   |   |   |   |
    |---|---|---|---|
    |   |   |   |   |
    |---|---|---|---|`;
            const board = parseAsciiTable(asciiTable, customResolver);
            const boardId = repository.save(board);
            expect(repository.load(boardId)).toBe(board);
        });
        it('returns undefined when loading a non-existent board', () => {
            const store = new Map();
            const repository = new InMemoryRepository(store);
            const boardId = crypto.randomUUID();
            expect(repository.load(boardId)).toBe(undefined);
        });
    });
});
