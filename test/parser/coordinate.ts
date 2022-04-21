import { parseAsLongitude, parseAsLatitude } from '../../src';

const testCoordinateParser = () =>
    describe('Coordinate parser', () => {
        it('should parse a number within range as latitude', () => {
            const latitude = 3.1234;
            expect(parseAsLatitude(latitude)).toBe(latitude);
        });
        it('should fail to parse as latitude due to out of valid range', () => {
            expect(() => parseAsLatitude(-91)).toThrowError();
            expect(() => parseAsLatitude(91)).toThrowError();
        });

        it('should parse a number within range as longitude', () => {
            const longitude = 120.1234;
            expect(parseAsLongitude(longitude)).toBe(longitude);
        });
        it('should fail to parse as longitude due to out of valid range', () => {
            expect(() => parseAsLongitude(-181)).toThrowError();
            expect(() => parseAsLongitude(181)).toThrowError();
        });
    });

export default testCoordinateParser;
