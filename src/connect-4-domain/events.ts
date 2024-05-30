type PlayerMovedFailedEventPayload = {
    message: string;
};

enum EventTypes {
    PLAYER_MOVE_FAILED = 'PLAYER_MOVE_FAILED'
}

export function createPlayerMoveFailedEvent(
    eventPayload: PlayerMovedFailedEventPayload
): PlayerMoveFailedEvent {
    return new PlayerMoveFailedEvent(eventPayload);
}

export class PlayerMoveFailedEvent {
    type: string;
    payload: PlayerMovedFailedEventPayload;

    constructor(eventPayload: PlayerMovedFailedEventPayload) {
        this.type = EventTypes.PLAYER_MOVE_FAILED;
        this.payload = eventPayload;
    }
}
