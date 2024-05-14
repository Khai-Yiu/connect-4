import { describe, it, expect } from 'vitest';

describe('toBeDeeplyUnequal', () => {
    it('should fail when given objects are the same object', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = obj1;
        expect(obj1).not.toBeDeeplyUnequal(obj2);
    });
    it('should pass when given objects are different objects', () => {
        const obj1 = {};
        const obj2 = {};
        expect(obj1).toBeDeeplyUnequal(obj2);
    });
    it('should pass given an object and an array', () => {
        const arr = [];
        const obj = {};
        expect(arr).toBeDeeplyUnequal(obj);
    });
    it('should pass given null and an object', () => {
        const obj = {};
        expect(obj).toBeDeeplyUnequal(null);
    });
    it('should pass given undefined and an object', () => {
        const obj = {};
        expect(obj).toBeDeeplyUnequal(undefined);
    });
    it('should fail when given the same arrays', () => {
        const arr1 = [];
        const arr2 = arr1;
        expect(arr1).not.toBeDeeplyUnequal(arr2);
    });
    it('should pass when given different arrays', () => {
        const arr1 = [];
        const arr2 = [];
        expect(arr1).toBeDeeplyUnequal(arr2);
    });
    it('should pass given two arrays that are unequal at a shallow level', () => {
        const arr1 = [1, 2];
        const arr2 = [2, 3];
        expect(arr1).toBeDeeplyUnequal(arr2);
    });
});
