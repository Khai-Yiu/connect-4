import { GameRepositoryInterface } from '@/connect-4-domain/game';
import { Board, BoardUuid } from '@/connect-4-domain/game-types';

type Store = Map<BoardUuid, Board>;

export default class InMemoryRepository implements GameRepositoryInterface {
    private store: Map<BoardUuid, Board>;

    constructor(store: Store = new Map<BoardUuid, Board>()) {
        this.store = store;
    }

    save(board: Board): BoardUuid {
        const boardUuid = crypto.randomUUID();
        this.store.set(boardUuid, board);

        return boardUuid;
    }

    load(boardUuid: BoardUuid): Board | undefined {
        return this.store.get(boardUuid);
    }
}
