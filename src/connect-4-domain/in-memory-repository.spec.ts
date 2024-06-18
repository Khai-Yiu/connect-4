import { BoardCell } from '@/connect-4-domain/game';
import InMemoryRepository from '@/connect-4-domain/in-memory-repository';
import parseAsciiTable from '@/connect-4-domain/parse-ascii-table';
import { describe, expect, it } from 'vitest';
import { PersistedGame, Status } from './game-types';

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
        it('loads a saved game', () => {
            const repository = new InMemoryRepository();
            const asciiTable = `
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|`;
            const persistedGame: PersistedGame = {
                board: parseAsciiTable(asciiTable, customResolver),
                activePlayer: 1,
                players: {
                    1: { playerNumber: 1, remainingDiscs: 4 },
                    2: { playerNumber: 2, remainingDiscs: 4 }
                },
                status: 'IN_PROGRESS' as Status
            };
            const gameId = repository.save(persistedGame);
            expect(repository.load(gameId)).toMatchObject(persistedGame);
        });
        it('returns undefined when loading a non-existent game', () => {
            const repository = new InMemoryRepository();
            const gameId = crypto.randomUUID();
            expect(repository.load(gameId)).toBe(undefined);
        });
    });
    describe('given a store', () => {
        const asciiTable = `
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|`;
        it('saves a game', () => {
            const store = new Map();
            const repository = new InMemoryRepository(store);
            const persistedGame: PersistedGame = {
                board: parseAsciiTable(asciiTable, customResolver),
                activePlayer: 1,
                players: {
                    1: { playerNumber: 1, remainingDiscs: 4 },
                    2: { playerNumber: 2, remainingDiscs: 4 }
                },
                status: 'IN_PROGRESS' as Status
            };
            const gameId = repository.save(persistedGame);
            expect(store.get(gameId)).toMatchObject(persistedGame);
        });
        it('saves a board with a provided UUID', () => {
            const store = new Map();
            const repository = new InMemoryRepository(store);
            const gameId = crypto.randomUUID();
            const persistedGame: PersistedGame = {
                board: parseAsciiTable(asciiTable, customResolver),
                activePlayer: 1,
                players: {
                    1: { playerNumber: 1, remainingDiscs: 4 },
                    2: { playerNumber: 2, remainingDiscs: 4 }
                },
                status: 'IN_PROGRESS' as Status
            };
            const retrievedGameId = repository.save(persistedGame, gameId);
            expect(retrievedGameId).toBe(gameId);
            expect(store.get(retrievedGameId)).toMatchObject(persistedGame);
        });
        it('loads a saved board', () => {
            const store = new Map();
            const repository = new InMemoryRepository(store);
            const board = parseAsciiTable(asciiTable, customResolver);
            const boardId = repository.save(board);
            expect(repository.load(boardId)).toBe(board);
        });
        it('returns undefined when loading a non-existent board', () => {
            const store = new Map();
            const repository = new InMemoryRepository(store);
            const gameId = crypto.randomUUID();
            expect(repository.load(gameId)).toBe(undefined);
        });
    });
});
