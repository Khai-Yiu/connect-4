import { describe, it, expect } from 'vitest';

describe('deepClone', () => {
    it('should return a primitive value as is', () => {
        expect(deepClone(2)).toBe(2);
    });
});
