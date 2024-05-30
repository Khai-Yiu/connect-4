type TargetCell = {
    row: number;
    column: number;
};

type Payload = {
    player: 1 | 2;
    targetCell: TargetCell;
};

enum CommandTypes {
    MOVE_PLAYER = 'MOVE_PLAYER'
}

export function createMovePlayerCommand(payload: Payload): MovePlayerCommand {
    return new MovePlayerCommand(payload);
}

export class MovePlayerCommand {
    type: string;
    payload: Payload;

    constructor(payload: Payload) {
        this.type = CommandTypes.MOVE_PLAYER;
        this.payload = payload;
    }
}
