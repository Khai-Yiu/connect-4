import { describe, it, expect } from 'vitest';
import {
    createPlayerMoveFailedEvent,
    PlayerMoveFailedEvent
} from '@/connect-4-domain/events';

describe('events', () => {
    describe('createPlayerMoveFailedEvent', () => {
        it('returns a PlayerMovedFailedEvent', () => {
            const playerMovedFailedEvent = createPlayerMoveFailedEvent({
                message:
                    "Cell at row -1 and column 0 doesn't exist on the board. The row number must be >= 0 and <= 1"
            });
            expect(playerMovedFailedEvent).toBeInstanceOf(
                PlayerMoveFailedEvent
            );
            expect(playerMovedFailedEvent).toEqual({
                type: 'PLAYER_MOVE_FAILED',
                payload: {
                    message:
                        "Cell at row -1 and column 0 doesn't exist on the board. The row number must be >= 0 and <= 1"
                }
            });
        });
    });
});
