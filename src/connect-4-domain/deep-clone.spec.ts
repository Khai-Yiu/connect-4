import { describe, it, expect } from 'vitest';
import deepClone from '@/connect-4-domain/deep-clone';

describe('deepClone', () => {
    it('should return a primitive value as is', () => {
        expect(deepClone(2)).toBe(2);
    });
    it('should return a deep copy of an array', () => {
        const original: (object | number[] | number)[] = [{ a: 1 }, 2, [3, 4]];
        const cloned = deepClone(original);
        expect(cloned).not.toBe(original);
        expect(cloned[0]).not.toBe(original[0]);
        expect(cloned[0]).toBeInstanceOf(Object);
        expect(Object.keys(cloned[0])).toHaveLength(1);
        expect(Object.hasOwn(cloned[0], 'a')).toBeTruthy();
        expect(cloned[0]['a']).toStrictEqual(original[0]['a']);
        expect(cloned[1]).toBe(original[1]);
        expect(cloned[2]).not.toBe(original[2]);
        expect(cloned[2][0]).toBe(original[2][0]);
        expect(cloned[2][1]).toBe(original[2][1]);
    });
});
