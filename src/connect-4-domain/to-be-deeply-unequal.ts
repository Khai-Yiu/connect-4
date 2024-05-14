import { MatcherResult } from '@/vitest';

function checkIsPlainObject(value: any): boolean {
    return (
        value !== null &&
        typeof value === 'object' &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}

function getValuesOfObject(value: any): Array<any> {
    return Object.values(value).reduce(
        (accValues: Array<any>, currentValue): Array<any> => {
            if (checkIsPlainObject(currentValue)) {
                return [
                    ...accValues,
                    currentValue,
                    ...getValuesOfObject(currentValue)
                ];
            } else if (Array.isArray(currentValue)) {
                return [...accValues, currentValue];
            }

            return [...accValues];
        },
        [] as Array<any>
    );
}

function isDeeplyUnequal(valueOne: any, valueTwo: any): boolean {
    if (
        !(Array.isArray(valueOne) && Array.isArray(valueTwo)) &&
        !(checkIsPlainObject(valueOne) && checkIsPlainObject(valueTwo))
    ) {
        return valueOne !== valueTwo;
    }

    const objectOneValues = getValuesOfObject(valueOne);
    const objectTwoValues = getValuesOfObject(valueTwo);

    return (
        valueOne !== valueTwo &&
        objectOneValues.reduce(
            (isUnequal, currValue) =>
                isUnequal &&
                !objectTwoValues.find((value) => value === currValue),
            true
        )
    );
}

function toBeDeeplyUnequal(
    this: { isNot: boolean } | void,
    received: object,
    expected: object
): MatcherResult {
    const isNot = this ?? {};

    return {
        pass: isDeeplyUnequal(received, expected),
        message: () => `Objects are deeply ${isNot ? 'un' : ''}equal`
    };
}

export default toBeDeeplyUnequal;
