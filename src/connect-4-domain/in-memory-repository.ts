import { GameRepository } from '@/connect-4-domain/game';
import { GameUuid, PersistedGame } from '@/connect-4-domain/game-types';
import { v4 as uuidv4 } from 'uuid';

type Store = Map<GameUuid, PersistedGame>;

export default class InMemoryRepository implements GameRepository {
    private store: Map<GameUuid, PersistedGame>;

    constructor(store: Store = new Map<GameUuid, PersistedGame>()) {
        this.store = store;
    }

    save(persistedGame: PersistedGame, gameId: GameUuid = uuidv4()): GameUuid {
        this.store.set(gameId, persistedGame);

        return gameId;
    }

    load(gameUuid: GameUuid): PersistedGame | undefined {
        return this.store.get(gameUuid);
    }
}
