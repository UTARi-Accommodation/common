import { parseNullableAsDefaultOrUndefined } from '../../src';

const testNullableParser = () =>
    describe('Nullable to default or undefined parser', () => {
        it('should parse a valid value as default value', () => {
            const obj = { x: 12, y: 34 };
            expect(parseNullableAsDefaultOrUndefined(obj)).toStrictEqual(obj);
            const number = 12;
            expect(parseNullableAsDefaultOrUndefined(number)).toStrictEqual(
                number
            );
        });
        it('should parse as nullable value as undefined', () => {
            expect(parseNullableAsDefaultOrUndefined(null)).toBe(undefined);
            expect(parseNullableAsDefaultOrUndefined(undefined)).toBe(
                undefined
            );
        });
    });

export default testNullableParser;
