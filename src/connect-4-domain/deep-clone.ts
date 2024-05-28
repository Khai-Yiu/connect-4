function checkIsObject(value: any): boolean {
    return (
        value !== null &&
        typeof value === 'object' &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}

function deepClone<T>(
    value: T,
    visited: WeakMap<any, any> = new WeakMap<any, any>()
): T {
    if (!(value instanceof Object) || typeof value === 'function') {
        return value;
    }

    if (visited.has(value)) {
        return visited.get(value);
    }

    const clone: T = Array.isArray(value) ? ([] as T) : ({} as T);
    visited.set(value, clone);

    const objOrArrayValue = value as { [key: string]: any };
    for (const key of Object.keys(objOrArrayValue)) {
        (clone as any)[key] = deepClone(objOrArrayValue[key], visited);
    }

    return clone;
}

export default deepClone;
