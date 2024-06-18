import { GameRepositoryInterface } from '@/connect-4-domain/game';
import { Board, GameUuid } from '@/connect-4-domain/game-types';

type Store = Map<GameUuid, Board>;

export default class InMemoryRepository implements GameRepositoryInterface {
    private store: Map<GameUuid, Board>;

    constructor(store: Store = new Map<GameUuid, Board>()) {
        this.store = store;
    }

    save(board: Board, boardId: GameUuid = crypto.randomUUID()): GameUuid {
        this.store.set(boardId, board);

        return boardId;
    }

    load(boardUuid: GameUuid): Board | undefined {
        return this.store.get(boardUuid);
    }
}
