import { BoardCell } from '@/connect-4-domain/game-types';
import InMemoryRepository from '@/connect-4-domain/in-memory-repository';
import parseAsciiTable from '@/connect-4-domain/parse-ascii-table';
import { describe, expect, it } from 'vitest';
import { PersistedGame, GameStatus } from './game-types';
import { v4 as uuidv4 } from 'uuid';

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
                status: 'IN_PROGRESS' as GameStatus
            };
            const gameId = repository.save(persistedGame);
            expect(repository.load(gameId)).toMatchObject(persistedGame);
        });
        it('returns undefined when loading a non-existent game', () => {
            const repository = new InMemoryRepository();
            const gameId = uuidv4();
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
                status: 'IN_PROGRESS' as GameStatus
            };
            const gameId = repository.save(persistedGame);
            expect(store.get(gameId)).toMatchObject(persistedGame);
        });
        it('saves a game with a provided UUID', () => {
            const store = new Map();
            const repository = new InMemoryRepository(store);
            const gameId = uuidv4();
            const persistedGame: PersistedGame = {
                board: parseAsciiTable(asciiTable, customResolver),
                activePlayer: 1,
                players: {
                    1: { playerNumber: 1, remainingDiscs: 4 },
                    2: { playerNumber: 2, remainingDiscs: 4 }
                },
                status: 'IN_PROGRESS' as GameStatus
            };
            const retrievedGameId = repository.save(persistedGame, gameId);
            expect(retrievedGameId).toBe(gameId);
            expect(store.get(retrievedGameId)).toMatchObject(persistedGame);
        });
        it('loads a saved game', () => {
            const store = new Map();
            const repository = new InMemoryRepository(store);
            const persistedGame: PersistedGame = {
                board: parseAsciiTable(asciiTable, customResolver),
                activePlayer: 1,
                players: {
                    1: { playerNumber: 1, remainingDiscs: 4 },
                    2: { playerNumber: 2, remainingDiscs: 4 }
                },
                status: 'IN_PROGRESS' as GameStatus
            };
            const gameId = repository.save(persistedGame);
            expect(repository.load(gameId)).toBe(persistedGame);
        });
        it('returns undefined when loading a non-existent game', () => {
            const store = new Map();
            const repository = new InMemoryRepository(store);
            const gameId = uuidv4();
            expect(repository.load(gameId)).toBe(undefined);
        });
    });
});
