function checkIsObject(value: any): boolean {
    return (
        value !== null &&
        typeof value === 'object' &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}

function deepClone<T>(value: T): T {
    if (Array.isArray(value)) {
        return value.map(deepClone) as T;
    }

    if (checkIsObject(value)) {
        const obj = value as { [key: string]: any };
        return Object.keys(obj).reduce((clonedObj, key) => {
            return { ...clonedObj, [key]: deepClone(obj[key]) };
        }, {} as T);
    }

    return value;
}

export default deepClone;
