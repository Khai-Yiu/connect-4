import { GameRepositoryInterface } from '@/connect-4-domain/game';
import { GameUuid, PersistedGame } from '@/connect-4-domain/game-types';

type Store = Map<GameUuid, PersistedGame>;

export default class InMemoryRepository implements GameRepositoryInterface {
    private store: Map<GameUuid, PersistedGame>;

    constructor(store: Store = new Map<GameUuid, PersistedGame>()) {
        this.store = store;
    }

    save(
        persistedGame: PersistedGame,
        gameId: GameUuid = crypto.randomUUID()
    ): GameUuid {
        this.store.set(gameId, persistedGame);

        return gameId;
    }

    load(gameUuid: GameUuid): PersistedGame | undefined {
        return this.store.get(gameUuid);
    }
}
