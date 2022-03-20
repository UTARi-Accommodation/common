import { parseAsLongitude, parseAsLatitude } from '../../src';

export default () =>
    describe('Coordinate parser', () => {
        it('should parse as latitude', () => {
            const latitude = 3.1234;
            expect(parseAsLatitude(latitude)).toBe(latitude);
        });
        it('should fail to parse as latitude due to out of valid range', () => {
            expect(() => parseAsLatitude(-91)).toThrowError();
            expect(() => parseAsLatitude(91)).toThrowError();
        });

        it('should parse as longitude', () => {
            const longitude = 120.1234;
            expect(parseAsLongitude(longitude)).toBe(longitude);
        });
        it('should fail to parse as longitude due to out of valid range', () => {
            expect(() => parseAsLongitude(-181)).toThrowError();
            expect(() => parseAsLongitude(181)).toThrowError();
        });
    });
