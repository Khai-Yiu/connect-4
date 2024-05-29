import { describe, expect, it } from 'vitest';
import createMovePlayerCommand from '@/connect-4-domain/commands';

describe('commands', () => {
    describe('createMovePlayerCommand', () => {
        it('should return a createMovePlayerCommand', () => {
            const movePlayerCommand = createMovePlayerCommand({
                player: 1,
                targetCell: { row: -1, column: 0 }
            });
            expect(movePlayerCommand).toBe('');
        });
    });
});
