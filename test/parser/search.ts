import { parseAsSearch } from '../../src';

export default () =>
    describe('Search parser', () => {
        it('should parse as search text', () => {
            const text = '  Testing purpose  ';
            expect(parseAsSearch(text)).toBe(text.trim());
        });
        it('should parse as undefined due to parameter is not string', () => {
            expect(parseAsSearch(undefined)).toBe(undefined);
        });
    });
