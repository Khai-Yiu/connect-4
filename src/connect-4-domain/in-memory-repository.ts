import { Board } from '@/connect-4-domain/game';

type BoardUuid = `${string}-${string}-${string}-${string}-${string}`;

type Store = Map<BoardUuid, Board>;

interface GameRepositoryInterface {
    save: (board: Board) => BoardUuid;
    load: (boardUuid: BoardUuid) => Board | undefined;
}

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
