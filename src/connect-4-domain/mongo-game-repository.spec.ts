import mongoose, { Model } from 'mongoose';
import { BoardCell } from '@/connect-4-domain/game-types';
import parseAsciiTable from '@/connect-4-domain/parse-ascii-table';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PersistedGame, GameStatus } from './game-types';
import { v4 as uuidv4 } from 'uuid';
import MongoGameRepository, {
    GameDocument,
    gameSchema
} from '@/connect-4-domain/mongo-game-repository';

describe('type-orm-game-repository', () => {
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
        it('creates a typeORM repository', () => {
            const repository = new MongoGameRepository();
            expect(repository).toBeInstanceOf(MongoGameRepository);
        });
        it('loads a saved game', async () => {
            const repository = new MongoGameRepository();
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
            const gameId = await repository.save(persistedGame);
            expect(await repository.load(gameId)).toMatchObject(persistedGame);
        });
        it('returns undefined when loading a non-existent game', async () => {
            const repository = new MongoGameRepository();
            const gameId = uuidv4();
            expect(await repository.load(gameId)).toBe(undefined);
        });
    });
    describe.skip('given a store', () => {
        const asciiTable = `
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|`;

        let gameModel: Model<GameDocument>;
        let repository: MongoGameRepository;

        beforeEach(async () => {
            await mongoose.connect('mongodb://localhost:27017/test');

            gameModel = mongoose.model<GameDocument>('Game', gameSchema);
            repository = new MongoGameRepository(gameModel);
        });

        afterEach(async () => {
            await mongoose.disconnect();
        });

        it('saves a game', async () => {
            const persistedGame: PersistedGame = {
                board: parseAsciiTable(asciiTable, customResolver),
                activePlayer: 1,
                players: {
                    1: { playerNumber: 1, remainingDiscs: 4 },
                    2: { playerNumber: 2, remainingDiscs: 4 }
                },
                status: 'IN_PROGRESS' as GameStatus
            };
            const gameId = await repository.save(persistedGame);
            expect(
                await gameModel.findOneBy({ gameUuid: gameId })
            ).toMatchObject(persistedGame);
        });
        it('saves a game with a provided UUID', async () => {
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
            const retrievedGameId = await repository.save(
                persistedGame,
                gameId
            );
            expect(retrievedGameId).toBe(gameId);
            expect(
                gameModel.findOne({ gameUuid: retrievedGameId }).exec()
            ).toMatchObject(persistedGame);
        });
        it('loads a saved game', async () => {
            const persistedGame: PersistedGame = {
                board: parseAsciiTable(asciiTable, customResolver),
                activePlayer: 1,
                players: {
                    1: { playerNumber: 1, remainingDiscs: 4 },
                    2: { playerNumber: 2, remainingDiscs: 4 }
                },
                status: 'IN_PROGRESS' as GameStatus
            };
            const gameId = await repository.save(persistedGame);
            expect(await repository.load(gameId)).toBe(persistedGame);
        });
        it('returns undefined when loading a non-existent game', async () => {
            const gameId = uuidv4();
            expect(await repository.load(gameId)).toBe(undefined);
        });
    });
});
